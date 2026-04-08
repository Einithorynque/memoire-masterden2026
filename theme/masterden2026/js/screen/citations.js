/**
 * citations.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Gestion des citations BibTeX dans un contexte PHP / page-type-to-print.
 * Utilise Citation.js via CDN (pas de Node.js).
 
 * ─────────────────────────────────────────────────────────────────────────────
 */

(function (global) { //Pour éviter de rentrer en conflit avec d'autres fonctions de la page
  "use strict";

  /* ═══════════════════════════════════════════════════════════════════════════
     CONFIGURATION — adaptez les valeurs au projet
  ═══════════════════════════════════════════════════════════════════════════ */
  const CONFIG = {
    // Sélecteur du conteneur principal injecté par PHP/page-type-to-print
    mainSelector: "#main",

    // ID de l'élément où la bibliographie sera injectée.
    // S'il n'existe pas dans le DOM, il sera créé à la fin de #main.
    bibliographyContainerId: "biblio",

    // Style CSL par défaut ("apa", "chicago-author-date", "vancouver", …)
    // Citation.js embarque APA et Vancouver nativement.
    defaultStyle: "chicago-notes",

    // Locale pour la mise en forme
    locale: "fr-FR",
  };

  /* ═══════════════════════════════════════════════════════════════════════════
     TYPES BibTeX → libellés français pour la bibliographie
  ═══════════════════════════════════════════════════════════════════════════ */
  const TYPE_LABELS = {
    "article-journal":    "Article de revue",
    book:                 "Livre",
    inbook:               "Chapitre de livre",
    incollection:         "Contribution dans un ouvrage collectif",
    document:             "Billet de blog et page web",
    "paper-conference":   "Article de colloque",
    conference:           "Actes de conférence",
    thesis:               "Thèse de doctorat",
    manuscript:           "Mémoire",
    misc:                 "Ressource en ligne / Divers",
    online:               "Ressource en ligne",
    unpublished:          "Document non publié",
    proceedings:          "Actes de conférence (ouvrage)",
    booklet:              "Livret",
    manual:               "Manuel",
    electronic:           "Document électronique",
  };

  // Ordre d'affichage des groupes dans la bibliographie
  const TYPE_ORDER = [
    "book", "incollection", "inbook",
    "article-journal", "paper-conference",
    "inproceedings", "conference", "proceedings",
    "thesis", "manuscript",
    "techreport", "misc", "online", "electronic", "unpublished",
  ];

  /* ═══════════════════════════════════════════════════════════════════════════
     Variables propre au script
  ═══════════════════════════════════════════════════════════════════════════ */
  let _cite        = null;   // instance Cite globale
  let _entries     = {};     // map clé BibTeX → objet CSL-JSON
  let _usedKeys    = [];     // ordre d'apparition des clés citées
  let _initialized = false;

  /* ═══════════════════════════════════════════════════════════════════════════
     Sécurité et parserBibTex
  ═══════════════════════════════════════════════════════════════════════════ */

  //Sécurité, au cas où citation-js ne ce soit pas charger
  function _checkDeps() {
    if (typeof Cite === "undefined") {
      console.error(
        "[CitationManager] Citation.js n'est pas chargé. " +
        "Ajoutez les balises <script> CDN dans <head> avant citations.js."
      );
      return false;
    }
    return true;
  }

  // Parse la chaîne BibTeX et indexe les entrées par leur clé.
  function _parseBibtex(bibtexString) {
    if (!_checkDeps()) return; //Si le fihier n'est pas chargé arrête le script
    try { //Instructions à faire
      _cite    = new Cite(bibtexString, { forceType: "@bibtex/text" });
      _cite.data.forEach((entry) => { //Permet de remplir le tableau -entries avec les données au format CSL JSON
        _entries[entry.id] = entry;
      });
      _initialized = true; // On confirme que citation-js est initialisé
      console.info(
        `[CitationManager] ${Object.keys(_entries).length} référence(s) chargée(s).`
      );
    } catch (e) { // si une des instructions rencontre une erreur alors diffuse ce message dans la console
      console.error("[CitationManager] Erreur de parsing BibTeX :", e);
    }
  }

  /**
   * Formate la citation inline (Auteur, année) à partir d'un objet CSL-JSON.
   * @param {object} entry
   * @returns {string}
   */
  function _formatInlineCitation(entry) {
    try {
        const singleCite = new Cite([entry]);
        let rendered = singleCite.format("bibliography", {
            format:   "html",
            template: CONFIG.defaultStyle,
            lang:     CONFIG.locale,
        });
        // Nettoyer les div de Citation.js
        return rendered
            .replace(/<div[^>]*class="csl-bib-body"[^>]*>/gi, "")
            .replace(/<div[^>]*class="csl-entry"[^>]*>/gi, "")
            .replace(/<\/div>/gi, "")
            .trim();
    } catch (e) {
        console.warn(`[CitationManager] Rendu inline impossible :`, e);
        return entry.id;
    }

    //si on veut du auteur date, commenté la partie précédente et 
    // enlever le commentaire de cette partie et remplacer dans config par chicago-author-date :

    // let authorPart = "Auteur.ice inconnu.e"; // Si trien n'est rempli pour l'auteuricedans le BibTex

    // if (entry.author && entry.author.length > 0) {//vérifie qu'il y'est bien une valeur auteur et que celle-ci soit supérieur à 1
    //   const a = entry.author;
    //   if (a.length === 1) { // Si un auteur
    //     authorPart = a[0].family || a[0].literal || "Auteur.ice inconnu.e"; //change le nom de l'auteurice avec le nom de famille ou le prénom
    //   } else if (a.length === 2) {
    //     authorPart = // Si deux auteurs
    //       (a[0].family || a[0].literal) + " & " + (a[1].family || a[1].literal);
    //   } else { //Si 3 auteurs ou +
    //     authorPart = (a[0].family || a[0].literal) + " et al.";
    //   }
    // } else if (entry.editor && entry.editor.length > 0) {//Sinon tente avec l'éditeur --> à préciser
    //   const e = entry.editor;
    //   authorPart =
    //     (e[0].family || e[0].literal || "Dir. inconnu.e") +
    //     (e.length > 1 ? " et al." : "") +
    //     " (dir.)";
    // } else if (entry.publisher) {
    //   authorPart = entry.publisher;
    // }

    // let year = "s.d."; // Si la date n'est pas dans le BibTex
    // if (entry.issued) {
    //   const dp = entry.issued["date-parts"];
    //   if (dp && dp[0] && dp[0][0]) year = dp[0][0]; //va chercher les deux chiffres de la date
    // }

    // return `(${authorPart}, ${year})`; // Renvoie l'expression Auteur.ice, date
  }

  /**
   * Génère le HTML complet d'une entrée bibliographique.
   * @param {string} key  clé BibTeX
   * @returns {string}    HTML du <li>
   */
  function _formatBibEntry(key) {
    const entry = _entries[key];
    if (!entry) return "";

    // Rendu Chicago via Citation.js
    let rendered = "";
    try {
      const singleCite = new Cite([entry]);
      rendered = singleCite.format("bibliography", { //On demande à citation-js de nous générer la citation biblio
        format:   "html",
        template: CONFIG.defaultStyle,
        lang:     CONFIG.locale,
      });
      // De base Citation.js enveloppe dans des div avec des class "csl-bib-body" & "csl-entry" donc on les remplace
      rendered = rendered  //La citation de citation-js sans les div
        .replace(/<div[^>]*class="csl-bib-body"[^>]*>/gi, "")
        .replace(/<div[^>]*class="csl-entry"[^>]*>/gi, "")
        .replace(/<\/div>/gi, "")
        .trim(); //retire les espace en début et fin de chaîne
    } catch (e) { // Si la citation échoue : 
      console.warn(`[CitationManager] Rendu impossible pour "${key}" :`, e);
      rendered = key;
    }

    const rawType  = (entry.type || "misc").toLowerCase(); // à approfondir
    const typeLabel = TYPE_LABELS[rawType] || rawType;

    return `
      <li class="bib-entry bib-type-${rawType}" id="bib-${key}">
        <span class="bib-content">${rendered}</span>
      </li>`;
  }

  /**
   Parcourt le HTML de #main, remplace [@clé] par des liens de citation,
   et mémorise l'ordre d'apparition.
   * @param {string} html
   * @returns {string}
   */
  function _replaceCitations(html) {
    _usedKeys = [];
    const keyOrder = {};
    let counter = 0;

    // cherche et accepte [@clé] et [@@clé], clé = lettres, chiffres, _, :, -
    const regex = /\[@@?([a-zA-Z0-9_:\-]+)\]/g;

    return html.replace(regex, (match, key) => {
      if (!_entries[key]) {
        console.warn(`[CitationManager] Clé inconnue : "${key}"`);
        return `<span class="citation-unknown" title="Référence introuvable">[?${key}]</span>`;
      }

      if (!(key in keyOrder)) {
        keyOrder[key] = ++counter;
        _usedKeys.push(key);
      }

      const inlineText = _formatInlineCitation(_entries[key]);
      return `<span class="citation-text" data-key="${key}">${inlineText}</span>`; //création de la citation avec les éléments déffinit plutôt
    });
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     Générateur de citations et biblio
  ═══════════════════════════════════════════════════════════════════════════ */
  const CitationManager = {

    /**
     * Charge un fichier .bib via fetch, puis résout la promesse.
     * @param {string} url
     * @returns {Promise<void>}
     */
    loadBibFile(url) { // charge un fichier .bib 
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

    /**
     * Charge directement une chaîne BibTeX (déjà disponible dans la page).
     * @param {string} bibtexString
     */
    loadBibString(bibtexString) { // charge du BibTeX déjà en mémoire
      _parseBibtex(bibtexString);
    },

    /**
     * Remplace toutes les citations dans #main, puis injecte la bibliographie.
     * À appeler après loadBibFile() ou loadBibString().
     */
    processPage() { // remplace les [@clé] + génère la biblio
      if (!_initialized) {
        console.error(
          "[CitationManager] Aucun BibTeX chargé. " +
          "Appelez loadBibFile() ou loadBibString() d'abord."
        );
        return;
      }

      const main = document.querySelector(CONFIG.mainSelector);
      if (!main) {
        console.error(
          `[CitationManager] Conteneur "${CONFIG.mainSelector}" introuvable.`
        );
        return;
      }

      // 1. Remplacer les marqueurs [@clé] par des span
      main.innerHTML = _replaceCitations(main.innerHTML);

      // 2. Générer et injecter la bibliographie
      this.renderBibliography(main);
    },

    /**
     * Génère et injecte le bloc bibliographie.
     * Peut être appelé indépendamment (ex. : rechargement AJAX partiel).
     * @param {HTMLElement} [container]  par défaut : document.querySelector(mainSelector)
     */
    renderBibliography(container) {
      if (!_initialized) return;

      const main = container || document.querySelector(CONFIG.mainSelector);
      if (!main) return;

      // Récupère ou crée le conteneur de bibliographie
      let bibContainer = document.getElementById(CONFIG.bibliographyContainerId);
      if (!bibContainer) {
        bibContainer = document.createElement("section");
        bibContainer.id = CONFIG.bibliographyContainerId;
        main.appendChild(bibContainer);
      }

      if (_usedKeys.length === 0) { //Si il n'y a pas de citations dans la liste des clés de citations
        bibContainer.innerHTML =
          "<p><em>Aucune citation détectée dans ce document.</em></p>";
        return;
      }

      // Grouper les clés par type BibTeX
      const groups = {};
      _usedKeys.forEach((key) => {
        const rawType = (_entries[key] && _entries[key].type
          ? _entries[key].type
          : "misc"
        ).toLowerCase();
        if (!groups[rawType]) groups[rawType] = [];
        groups[rawType].push(key);
      });

      // Types présents, dans l'ordre canonique + éventuels types inconnus à la fin
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

      bibContainer.innerHTML = bibHtml;
    },

    /* — Utilitaires — */

    /** Clés citées dans l'ordre d'apparition. */
    getUsedKeys() { return [..._usedKeys]; },

    /** Map complète clé → CSL-JSON de toutes les références chargées. */
    getEntries()  { return { ..._entries }; },

    /** Réinitialise l'état (rechargement AJAX, navigation SPA…). */
    reset() {
      _cite        = null;
      _entries     = {};
      _usedKeys    = [];
      _initialized = false;
    },
  };

  global.CitationManager = CitationManager;

})(window);
