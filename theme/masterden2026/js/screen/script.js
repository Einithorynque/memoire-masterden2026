window.addEventListener('DOMContentLoaded', () => {

  window.Cite = require('citation-js');
  CitationManager.loadBibFile("content/ref/bib.bib")
  .then(function () {
    CitationManager.processPage();

    // ── Récupération des sections valides ──────────────────────────────────
    var sections = document.querySelectorAll('section[id]');
    const slugsFromNav = Array.from(document.querySelectorAll('#nav ul a'))
      .map(link => link.getAttribute('href').substring(1));
    const filteredSections = Array.from(sections)
      .filter(sec => slugsFromNav.includes(sec.id));

    // ── Construction du TOC h2/h3 dans #nav ───────────────────────────────
    const navUl = document.querySelector('#nav .nav-ul');
    const tocWrapper = document.createElement('div');
    tocWrapper.id = 'toc-tree';

    filteredSections.forEach((sec, i) => {
      // Titre de la section : on le lit depuis le lien nav existant dans le body.php
      const navLabel = document.querySelector(`#nav a[href="#${sec.id}"]`)?.textContent || sec.id;

      //création d'une div par partie du mémoire.
      const secBlock = document.createElement('div');
      secBlock.className = 'toc-section';
      
      secBlock.dataset.index = i;

      // Bouton du h2
      const secBtn = document.createElement('button');
      secBtn.className = 'toc-section-btn';

      const headings = Array.from(sec.querySelectorAll('h2, h3'));
      // On prend le premier h2 comme titre principal, sinon le label du nav
      const firstH2 = sec.querySelector('h2');
      secBtn.textContent = firstH2?.textContent.trim() || navLabel;

      // Chevron uniquement s'il y a des sous-titres
      const subHeadings = headings.filter((h, idx) =>
        !(idx === 0 && h.tagName === 'H2') // on exclut le premier h2 déjà utilisé comme titre
      );

      //création du chevron
      if (subHeadings.length) {
        // const chevron = document.createElement('span');
        secBtn.classList.add('toc-chevron');
        // chevron.setAttribute('aria-hidden', 'true');
        // secBtn.appendChild(chevron);
      }

      // Toggle le sous-menu avec les h3 en leur ajoutant une classe open, si il n 'y a pas
      // de sous liste le bouton devient un lien directe vers la section. 
      if (subHeadings.length) {
        secBtn.addEventListener('click', () => {
        secBlock.classList.toggle('open');
        const subList = secBlock.querySelector('.toc-sublist');
        if (subList) {
          if (secBlock.classList.contains('open')) {
            subList.removeAttribute('inert');
          } else {
            subList.setAttribute('inert', '');
          }
        }
      });
      } else {
        secBtn.addEventListener('click', () => {
        showSection(i);
      });
      }
      
      //insère dans la div de la partie le bouton du h2s
      secBlock.appendChild(secBtn);

      // Sous-liste h2/h3
      if (subHeadings.length) {
        const subList = document.createElement('ul');
        subList.setAttribute('inert', '')
        subList.className = 'toc-sublist';

        subHeadings.forEach(heading => {
          // Générer un id si le heading n'en a pas
          if (!heading.id) {
            heading.id = 'h-' + heading.textContent.trim()
              .toLowerCase()
              .replace(/[\s']+/g, '-')  //→ remplace les espaces et apostrophes par des tirets
              .replace(/[^\w-]/g, '') //→ supprime tout ce qui n'est ni lettre/chiffre ni tiret
              .substring(0, 50); //s'arrête à 50 caractères max
          }

          const li = document.createElement('li');
          li.className = heading.tagName === 'H2' ? 'toc-sub-h2' : 'toc-sub-h3';

          const link = document.createElement('button');
          link.textContent = heading.textContent.trim();
          link.addEventListener('click', (e) => {
            e.stopPropagation();
            // 1. Afficher la bonne section
            showSection(i);
            // 2. Scroll vers le heading (après que display:block soit appliqué)
            requestAnimationFrame(() => {
              heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
            // 3. Marquer actif
            tocWrapper.querySelectorAll('.toc-sublist button').forEach(b => b.classList.remove('active'));
            link.classList.add('active');
          });

          li.appendChild(link);
          subList.appendChild(li);
        });

        secBlock.appendChild(subList);
      }

      tocWrapper.appendChild(secBlock);
    });

    // Insérer le TOC avant la nav-ul existante (qui reste cachée mais garde les slugs)
    navUl.style.display = 'none'; // on la cache visuellement mais on la garde pour les slugs
    navUl.parentElement.insertBefore(tocWrapper, navUl);

    // ── Quicklinks : bouton suivant  ─────────────────────────────
    var buttonFooter = document.querySelector('#footer-button-next');
    const nextBtn = document.createElement('button');
    nextBtn.textContent = "Lire la partie suivante";
    nextBtn.addEventListener('click', function() {
      if (currentIndex < filteredSections.length - 1) {
        showSection(currentIndex + 1);
      } else {
        showSection(currentIndex = 0);
      }
    });
    buttonFooter.appendChild(nextBtn);

    // ── Quicklinks : fast travel ───────────────────────────
    var quicklinks = document.querySelector('#quicklinks');
    var fastTravel = document.createElement('div');
    fastTravel.id = 'fastTravel';
    const ftMenu = document.createElement('ul');

    filteredSections.forEach((sec, i) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      const aChildren = document.createElement('div');
      a.classList.add('quicklinks-button');
      aChildren.classList.add('quicklinks_text');
      a.href = '#' + sec.id;
      aChildren.textContent = document.querySelector(`#nav a[href="#${sec.id}"]`)?.textContent || sec.id;
      a.appendChild(aChildren);
      li.appendChild(a);
      ftMenu.appendChild(li);

      a.addEventListener('click', (e) => {
        e.preventDefault();
        showSection(i);
      });
    });

    ftMenu.querySelector('a')?.classList.add('active');
    fastTravel.appendChild(ftMenu);
    quicklinks.prepend(fastTravel);

    // ── État courant ───────────────────────────────────────────────────────
    let currentIndex = 0;
    let isFirstLoad = true;

    function showSection(i) {
      currentIndex = i;

      // Afficher/masquer les sections
      document.querySelectorAll("section").forEach(sec => {
        sec.style.display = "none";
      });
      const el = filteredSections[currentIndex];
      if (el) el.style.display = "block";

      if (!isFirstLoad) {
        el.scrollIntoView({ behavior: 'smooth' });
      }

      // Activer le bon bloc dans le TOC
      tocWrapper.querySelectorAll('.toc-section').forEach((block, idx) => {
        const isActive = idx === currentIndex;
        block.classList.toggle('active', isActive);
        // Ouvrir automatiquement la section active, fermer les autres
        block.classList.toggle('open', isActive);
        const subList = block.querySelector('.toc-sublist');
        if (subList) {
          if (isActive) {
            subList.removeAttribute('inert');
          } else {
            subList.setAttribute('inert', '');
          }
        }
      });

      // Activer le bon lien dans le fast travel
      ftMenu.querySelectorAll('a').forEach((l, idx) => {
        l.classList.toggle('active', idx === currentIndex);
      });

      updateBtn();
      isFirstLoad = false;
    }

    function updateBtn() {
      if (currentIndex >= filteredSections.length - 1) {
        nextBtn.textContent = "Revenir au début";
      } else {
        nextBtn.textContent = "Lire la partie suivante";
      }
    }

    // ── Apparition sommaire  ────────────────────────────────────────
    var toggleBtn = document.getElementById('toggle-btn');
    var nav = document.getElementById('nav');
    var closeBtn = document.getElementById('btn-fermer');

    toggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      nav.style.transform = "translateX(0)";
      nav.removeAttribute('inert');
      nav.setAttribute('aria-hidden', 'false');
      const firstLink = nav.querySelector('#toc-tree button');
      if (firstLink) firstLink.focus();
    });
    closeBtn.addEventListener('click', () => {
      nav.style.transform = "translateX(100%)";
      nav.setAttribute('inert', '');
      nav.setAttribute('aria-hidden', 'true');
      toggleBtn.focus();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.getAttribute('aria-hidden') === 'false') {
      // ⚠️ Dans votre version, les accolades manquaient — tout s'exécutait toujours
      nav.setAttribute('inert', '');
      nav.setAttribute('aria-hidden', 'true');
      nav.style.transform = "translateX(100%)";
      toggleBtn.focus();
  }
    });

    // ── PDF download guard  ──────────────────────────────────────
    var downloadlink = quicklinks.querySelector('a:last-child');
    downloadlink.onclick = () => {
      if (downloadlink.getAttribute('href') == "") {
        alert("Un fichier PDF doit être généré et téléversé dans le dossier...");
      }
    };

    // ── Embeds vidéo ────────────────────────────────────────────
    document.querySelectorAll(':is(vimeo-embed, youtube-embed) button').forEach(button =>
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const video = button.previousElementSibling;
        video.src = video.dataset.src;
      })
    );

    showSection(0);

  }); // fin du .then()
});

// ── Scroll : apparition/disparition du quicklinks  ────────────────
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("quicklinks").style.bottom = "0px";
  } else {
    document.getElementById("quicklinks").style.bottom = "-120vh";
  }
  prevScrollpos = currentScrollPos;
};
