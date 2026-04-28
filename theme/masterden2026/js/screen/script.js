
window.addEventListener('DOMContentLoaded', () => {

  window.Cite = require('citation-js');
  CitationManager.loadBibFile("content/ref/bib.bib")
  .then(function () {
  CitationManager.processPage(); // réécrit le HTML des citations

  // menu clone
  var sections = document.querySelectorAll('section[id]');
  // -> On récupère les slugs valides depuis le menu PHP
  const slugsFromNav = Array.from(document.querySelectorAll('#nav ul a'))
  .map(link => link.getAttribute('href').substring(1));
  // -> On filtre : on ne garde que les sections dont l'ID est dans les slugs
  const filteredSections = Array.from(sections)
  .filter(sec => slugsFromNav.includes(sec.id));
  // -> creation des liens
  
  var menu = document.createElement('ul');
  filteredSections.forEach((sec) => {
  const li = document.createElement('li');
  const a  = document.createElement('a');
  const aChildren = document.createElement('div')
  a.classList.add('quicklinks-button');
  aChildren.classList.add('quicklinks_text')
  a.href        = "#" + sec.id;
  aChildren.textContent = document.querySelector(`#nav a[href="#${sec.id}"]`)?.textContent || sec.id;
  a.appendChild(aChildren)
  li.appendChild(a);
  menu.appendChild(li);
  });

  var quicklinks = document.querySelector('#quicklinks');
  var index = document.createElement('div');
  index.appendChild(menu);
  index.id = "fastTravel";
  quicklinks.prepend(index);

  // État de la section actuel
  let currentIndex = 0;

  // Fonction centrale (afficher / désafficher / scroller vers / changer l'état des boutons) ---
  let isFirstLoad = true;

  function showSection(i) {
    currentIndex = i;
    document.querySelectorAll("section").forEach(sec => {
      sec.style.display = "none";
    });
    const el = filteredSections[currentIndex];
    if (el) el.style.display = "block";
    
    // Scroll vers la section
    if (!isFirstLoad) {
      el.scrollIntoView({ behavior: 'smooth' });
    }

    // ↓ Mettre à jour la classe active dans le menu
    menu.querySelectorAll('a').forEach((l, index) => {
      l.classList.toggle('active', index === currentIndex);
    });
    updateBtn();
    isFirstLoad = false;
  }

  // Sélection des séctions
  menu.querySelectorAll('a').forEach((link, i) => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      showSection(i); // on passe l'index, pas l'ID
    });
  });
  menu.querySelector('a').classList.add('active');

  // Bouton suivant 
  var buttonFooter = document.querySelector('#footer-button-next');
  const nextBtn = document.createElement('button');
  nextBtn.textContent = "Lire la partie suivante";
  nextBtn.addEventListener('click', function() {
    if (currentIndex < filteredSections.length - 1) {
      showSection(currentIndex + 1);
    } else {
      showSection(currentIndex = 0)
    }
  });
  buttonFooter.appendChild(nextBtn);

  function updateBtn() {
  if (currentIndex >= filteredSections.length - 1) {
    nextBtn.textContent = "Revenir au début";  // dernière section → on cache
  } else {
    nextBtn.textContent = "Lire la partie suivante"; // sinon → on montre
  }
  }

  // Afficher uniquement la première section au chargement de la page
  showSection(0);

  var downloadlink = quicklinks.querySelector('a:last-child');
  downloadlink.onclick = () => {
     if(downloadlink.getAttribute('href') == ""){
       alert("Un fichier PDF doit être généré et téléversé dans le dossier. Le nom du fichier doit être configuré dans config.php. Documentation: https://ateliers.esad-pyrenees.fr/pagetypetoprint/print/.")
     }
   }

  // youtube and vimeo light embeds
  document.querySelectorAll(':is(vimeo-embed, youtube-embed) button').forEach(button => button.addEventListener('click', (e) => {
    e.preventDefault()
    const video = button.previousElementSibling;
    video.src = video.dataset.src;
  }))

   
   // sommaire overlay
  var toggleBtn = document.getElementById('toggle-btn');
  var nav = document.getElementById('nav');
  var closeBtn = document.getElementById('btn-fermer');

    // Clic sur le lien "Sommaire" : ouvre le panneau
    toggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      nav.style.transform = "translateX(0)";
    });

    // Clic sur le bouton "Fermer" : ferme le panneau
    closeBtn.addEventListener('click', (e) => {
      nav.style.transform = "translateX(50vw)";
    });

    // Touche Échap : ferme le panneau (accessibilité)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') nav.style.transform = "translateX(50vw)";
    });
   }); // fin du .then()
});

// Aparition et disparition du sommaire au scroll
    var prevScrollpos = window.pageYOffset;
    window.onscroll = function() {
      var currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        document.getElementById("quicklinks").style.bottom = "0px";
      } else {
        document.getElementById("quicklinks").style.bottom = "-120vh";
      }
      prevScrollpos = currentScrollPos;
    } 



