/**
 * citations-print.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Version pour PagedJS / page-type-to-print.
 * Différence clé avec citations.js : on N'utilise PAS innerHTML pour remplacer
 * les citations — on parcourt les nœuds texte un par un avec TreeWalker.
 * Cela évite de détruire le DOM pendant que PagedJS le mesure.
 * ─────────────────────────────────────────────────────────────────────────────
 */

(function (global) {
  "use strict";

  /* ═══════════════════════════════════════════════════════════════════════════
     CONFIGURATION
  ═══════════════════════════════════════════════════════════════════════════ */
  const CONFIG = {
    // ⚠️ On cible le BODY — c'est le HTML source avant que PagedJS pagine.
    // Ne PAS mettre .pagedjs_pages ici : ces éléments n'existent pas encore
    // au moment où ce script s'exécute.
    mainSelector: "body",

    // ID de la section bibliographie dans votre HTML source.
    // Elle doit exister dans votre markdown : <section id="biblio"></section>
    bibliographyContainerId: "biblio",

    // Style CSL : "apa", "chicago-author-date", "vancouver"
    defaultStyle: "chicago-author-date",

    // Locale
    locale: "fr-FR",
  };

  /* ═══════════════════════════════════════════════════════════════════════════
     TYPES BibTeX → libellés français
  ═══════════════════════════════════════════════════════════════════════════ */
  const TYPE_LABELS = {
    "article-journal":  "Article de revue",
    book:               "Livre",
    inbook:             "Chapitre de livre",
    incollection:       "Contribution dans un ouvrage collectif",
    document:           "Billet de blog",
    "paper-conference": "Article de colloque",
    conference:         "Actes de conférence",
    thesis:             "Thèse de doctorat",
    manuscript:         "Mémoire de master",
    misc:               "Ressource en ligne / Divers",
    online:             "Ressource en ligne",
    unpublished:        "Document non publié",
    proceedings:        "Actes de conférence (ouvrage)",
    booklet:            "Livret",
    manual:             "Manuel",
    electronic:         "Document électronique",
  };

  const TYPE_ORDER = [
    "book", "incollection", "inbook",
    "article-journal", "paper-conference",
    "inproceedings", "conference", "proceedings",
    "thesis", "manuscript",
    "techreport", "misc", "online", "electronic", "unpublished",
  ];

  /* ═══════════════════════════════════════════════════════════════════════════
     ÉTAT INTERNE
  ═══════════════════════════════════════════════════════════════════════════ */
  let _cite        = null;
  let _entries     = {};
  let _usedKeys    = [];
  let _initialized = false;

  /* ═══════════════════════════════════════════════════════════════════════════
     HELPERS PRIVÉS
  ═══════════════════════════════════════════════════════════════════════════ */

  function _checkDeps() {
    if (typeof Cite === "undefined") {
      console.error("[CitationManager] Citation.js n'est pas chargé.");
      return false;
    }
    return true;
  }

  function _parseBibtex(bibtexString) {
    if (!_checkDeps()) return;
    try {
      _cite    = new Cite(bibtexString, { forceType: "@bibtex/text" });
      _entries = {};
      _cite.data.forEach((entry) => {
        _entries[entry.id] = entry;
      });
      _initialized = true;
      console.info(`[CitationManager] ${Object.keys(_entries).length} référence(s) chargée(s).`);
    } catch (e) {
      console.error("[CitationManager] Erreur de parsing BibTeX :", e);
    }
  }

  function _formatInlineCitation(entry) {
    let authorPart = "Auteur.ice inconnu.e";

    if (entry.author && entry.author.length > 0) {
      const a = entry.author;
      if (a.length === 1) {
        authorPart = a[0].family || a[0].literal || "Auteur.ice inconnu.e";
      } else if (a.length === 2) {
        authorPart = (a[0].family || a[0].literal) + " & " + (a[1].family || a[1].literal);
      } else {
        authorPart = (a[0].family || a[0].literal) + " et al.";
      }
    } else if (entry.editor && entry.editor.length > 0) {
      const e = entry.editor;
      authorPart =
        (e[0].family || e[0].literal || "Dir. inconnu.e") +
        (e.length > 1 ? " et al." : "") +
        " (dir.)";
    } else if (entry.publisher) {
      authorPart = entry.publisher;
    }

    let year = "s.d.";
    if (entry.issued) {
      const dp = entry.issued["date-parts"];
      if (dp && dp[0] && dp[0][0]) year = dp[0][0];
    }

    return `(${authorPart}, ${year})`;
  }

  function _formatBibEntry(key) {
    const entry = _entries[key];
    if (!entry) return "";

    let rendered = "";
    try {
      const singleCite = new Cite([entry]);
      rendered = singleCite.format("bibliography", {
        format:   "html",
        template: CONFIG.defaultStyle,
        lang:     CONFIG.locale,
      });
      rendered = rendered
        .replace(/<div[^>]*class="csl-bib-body"[^>]*>/gi, "")
        .replace(/<div[^>]*class="csl-entry"[^>]*>/gi, "")
        .replace(/<\/div>/gi, "")
        .trim();
    } catch (e) {
      console.warn(`[CitationManager] Rendu impossible pour "${key}" :`, e);
      rendered = key;
    }

    const rawType   = (entry.type || "misc").toLowerCase();

    return `
      <li class="bib-entry bib-type-${rawType}" id="bib-${key}">
        <span class="bib-content">${rendered}</span>
      </li>`;
  }

  /* ─────────────────────────────────────────────────────────────────────────
     ✅ LA FONCTION CLÉ : remplacement via TreeWalker (sans innerHTML)
     
     Pourquoi TreeWalker et pas innerHTML ?
     innerHTML détruit et recrée TOUT le DOM du conteneur.
     Si PagedJS est en train de mesurer des éléments dans ce conteneur,
     il essaie d'accéder à des éléments qui n'existent plus → crash.
     
     TreeWalker parcourt les nœuds texte un par un et les remplace
     chirurgicalement avec replaceChild → le reste du DOM est intact.
  ───────────────────────────────────────────────────────────────────────── */
  function _replaceInTextNodes(container) {

    // TreeWalker : un "curseur" qui se déplace de nœud texte en nœud texte
    // NodeFilter.SHOW_TEXT → on ne veut voir que les nœuds texte,
    // pas les balises HTML
    const walker = document.createTreeWalker(
      container,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node) {
          const parent = node.parentElement;

          // Sécurité : on ignore les nœuds sans parent
          if (!parent) return NodeFilter.FILTER_REJECT;

          // On ignore ce qui est dans <script> ou <style>
          // (pas de citations à remplacer là-dedans)
          const tag = parent.tagName.toLowerCase();
          if (tag === "script" || tag === "style") return NodeFilter.FILTER_REJECT;

          // Optimisation : si le texte ne contient pas [@, inutile de le traiter
          if (!node.textContent.includes("[@")) return NodeFilter.FILTER_REJECT;

          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    // ⚠️ On collecte D'ABORD tous les nœuds à traiter dans un tableau,
    // puis on les modifie. On ne modifie JAMAIS le DOM pendant qu'on
    // le parcourt avec walker — cela déplacerait le curseur et ferait
    // sauter des nœuds.
    const nodesToReplace = [];
    let node;
    while ((node = walker.nextNode())) {
      nodesToReplace.push(node);
    }

    // L'expression régulière qui détecte [@clé] et [@@clé]
    const regex = /\[@@?([a-zA-Z0-9_:\-]+)\]/g;

    nodesToReplace.forEach((textNode) => {
      const text = textNode.textContent;

      // .test() vérifie s'il y a un match — puis on remet lastIndex à 0
      // car .test() et .exec() partagent la même position dans la regex /g
      if (!regex.test(text)) return;
      regex.lastIndex = 0;

      // Un DocumentFragment est un "sac" invisible qui peut contenir
      // plusieurs nœuds. On va le construire, puis l'insérer d'un coup
      // à la place du nœud texte original.
      const fragment = document.createDocumentFragment();
      let lastIndex = 0;
      let match;

      // .exec() trouve les matches un par un
      while ((match = regex.exec(text)) !== null) {
        const key = match[1]; // le contenu capturé entre [@  et ]

        // 1. Texte AVANT la citation → nœud texte simple
        if (match.index > lastIndex) {
          fragment.appendChild(
            document.createTextNode(text.slice(lastIndex, match.index))
          );
        }

        // 2. La citation elle-même
        if (!_entries[key]) {
          // Clé inconnue → span rouge pour signaler le problème
          console.warn(`[CitationManager] Clé inconnue : "${key}"`);
          const span = document.createElement("span");
          span.className = "citation-unknown";
          span.title     = "Référence introuvable";
          span.textContent = `[?${key}]`;
          fragment.appendChild(span);
        } else {
          // Clé connue → on mémorise son ordre d'apparition
          if (!_usedKeys.includes(key)) _usedKeys.push(key);

          // On crée le span de citation
          const span = document.createElement("span");
          span.className      = "citation-text";
          span.dataset.key    = key;
          span.textContent    = _formatInlineCitation(_entries[key]);
          fragment.appendChild(span);
        }

        // On avance le curseur après la fin de ce match
        lastIndex = regex.lastIndex;
      }

      // 3. Texte APRÈS la dernière citation
      if (lastIndex < text.length) {
        fragment.appendChild(
          document.createTextNode(text.slice(lastIndex))
        );
      }

      // Remplacement chirurgical : le nœud texte original est remplacé
      // par le fragment (qui contient texte + spans de citation)
      // Le reste du DOM autour est intact.
      textNode.parentNode.replaceChild(fragment, textNode);
    });
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     API PUBLIQUE
  ═══════════════════════════════════════════════════════════════════════════ */
  const CitationManager = {

    loadBibFile(url) {
      return fetch(url)
        .then((r) => {
          if (!r.ok) throw new Error(`HTTP ${r.status} pour ${url}`);
          return r.text();
        })
        .then((text) => _parseBibtex(text))
        .catch((e) =>
          console.error("[CitationManager] Impossible de charger le .bib :", e)
        );
    },

    loadBibString(bibtexString) {
      _parseBibtex(bibtexString);
    },

    /* ───────────────────────────────────────────────────────────────────────
       processPagedJS — à appeler dans DOMContentLoaded, AVANT que PagedJS
       ne pagine le document.
       
       Flux correct :
         DOMContentLoaded
           → loadBibFile() charge le .bib
           → processPagedJS() remplace les [@clé] dans le HTML source
           → renderBibliography() remplit #biblio dans le HTML source
           → PagedJS pagine le HTML DÉJÀ traité ✅
    ─────────────────────────────────────────────────────────────────────── */
    processPagedJS(sourceSelectors) {
      if (!_initialized) {
        console.error("[CitationManager] BibTeX non chargé.");
        return;
      }

      const selectors = sourceSelectors || ["body"];

      selectors.forEach((selector) => {
        const container = document.querySelector(selector);
        if (!container) {
          console.warn(`[CitationManager] Sélecteur introuvable : "${selector}"`);
          return;
        }
        // ✅ TreeWalker : pas de innerHTML, DOM intact pour PagedJS
        _replaceInTextNodes(container);
      });

      // Remplit #biblio dans le HTML source
      this.renderBibliography();
    },

    renderBibliography(container) {
      if (!_initialized) return;

      const main = container || document.querySelector(CONFIG.mainSelector);
      if (!main) return;

      let bibContainer = document.getElementById(CONFIG.bibliographyContainerId);
      if (!bibContainer) {
        // Si #biblio n'existe pas dans le HTML source, on le crée dans body
        bibContainer = document.createElement("section");
        bibContainer.id = CONFIG.bibliographyContainerId;
        main.appendChild(bibContainer);
      }

      if (_usedKeys.length === 0) {
        bibContainer.innerHTML = "<p><em>Aucune citation détectée.</em></p>";
        return;
      }

      // Grouper par type
      const groups = {};
      _usedKeys.forEach((key) => {
        const rawType = (_entries[key] && _entries[key].type
          ? _entries[key].type
          : "misc"
        ).toLowerCase();
        if (!groups[rawType]) groups[rawType] = [];
        groups[rawType].push(key);
      });

      const presentTypes = [
        ...TYPE_ORDER.filter((t) => groups[t]),
        ...Object.keys(groups).filter((t) => !TYPE_ORDER.includes(t)),
      ];

      let bibHtml = `<h2 class="bib-title">Bibliographie</h2>`;

      presentTypes.forEach((type) => {
        const label = TYPE_LABELS[type] || type;
        bibHtml += `
          <div class="bib-group bib-group-${type}">
            <h3 class="bib-group-title">${label}s</h3>
            <ul class="bib-list">`;
        groups[type].forEach((key) => {
          bibHtml += _formatBibEntry(key);
        });
        bibHtml += `</ul></div>`;
      });

      // ✅ innerHTML ici est acceptable : #biblio est vide au départ,
      // PagedJS ne l'a pas encore mesuré quand on l'écrit.
      bibContainer.innerHTML = bibHtml;
    },

    getUsedKeys() { return [..._usedKeys]; },
    getEntries()  { return { ..._entries }; },
    reset() {
      _cite        = null;
      _entries     = {};
      _usedKeys    = [];
      _initialized = false;
    },
  };

  global.CitationManager = CitationManager;

})(window);