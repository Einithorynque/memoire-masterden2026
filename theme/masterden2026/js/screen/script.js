
window.addEventListener('DOMContentLoaded', () => {

  // menu clone
  var sections = document.querySelectorAll('section[id]');
  // -> On récupère les slugs valides depuis le menu PHP
  const slugsFromNav = Array.from(document.querySelectorAll('#nav ul a'))
  .map(link => link.getAttribute('href').substring(1));
  // -> On filtre : on ne garde que les sections dont l'ID est dans les slugs
  const filteredSections = Array.from(sections)
  .filter(sec => slugsFromNav.includes(sec.id));
  // -> creation du clone
  var menu = document.querySelector("#nav ul").cloneNode(true);
  var main = document.querySelector('#main');
  var index = document.createElement('nav');
  index.appendChild(menu);
  index.id = "index";
  main.prepend(index);

  // État de la section actuel
  let currentIndex = 0;

  // Fonction centrale (afficher / désafficher) ---
  function showSection(i) {
    currentIndex = i;
    document.querySelectorAll("section").forEach(sec => {
      sec.style.display = "none";
    });
    const el = filteredSections[currentIndex];
    if (el) el.style.display = "block";
    updateBtn();
  }

  // Sélection des séctions
  menu.querySelectorAll('a').forEach((link, i) => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      showSection(i); // on passe l'index, pas l'ID
    });
  });

  // Bouton suivant 
  var buttonFooter = document.querySelector('#footer-button-next');
  const nextBtn = document.createElement('button');
  nextBtn.textContent = "Lire la partie suivante";
  nextBtn.addEventListener('click', function() {
    if (currentIndex < filteredSections.length - 1) {
      showSection(currentIndex + 1);
    }
  });
  buttonFooter.appendChild(nextBtn);

  function updateBtn() {
  if (currentIndex >= filteredSections.length - 1) {
    nextBtn.style.display = "none";  // dernière section → on cache
  } else {
    nextBtn.style.display = "block"; // sinon → on montre
  }
  }

  // Afficher uniquement la première section au chargement de la page
  showSection(0);
  
  // injecte les liens rapides
  var quicklinks = document.querySelector("#quicklinks").cloneNode(true);
  quicklinks.id = "index-quicklinks";
  index.appendChild(quicklinks);
  // mise à jour dupremier lien (vers la première section, et non plus vers le sommaire)
  quicklinks.querySelector('a').textContent = "↑";
  quicklinks.querySelector('a').href = "#" + index.nextElementSibling.id;


  // menu mobile: insère un bouton pour afficher/masquer le menu
  var togglemenu = document.createElement('button');
  togglemenu.textContent = "☰";
  togglemenu.addEventListener('click', function(e){
    e.stopPropagation();
    index.classList.toggle('visible');
  })
  index.prepend(togglemenu);

  index.addEventListener('click', function(){
    index.classList.remove('visible');
  })
  
  // surligne le chapître courant au scroll
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');      
      if (entry.intersectionRatio > 0) {
        document.querySelector(`#index li a[href="#${id}"]`).parentElement.classList.add('active');
      } else {
        document.querySelector(`#index li a[href="#${id}"]`).parentElement.classList.remove('active');
      }
    });
  });

  // observe chaque section
  sections.forEach((section) => {
    observer.observe(section);
  });

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

});


