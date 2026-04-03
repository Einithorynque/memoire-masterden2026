<!-- Styles communs -->
<link rel="stylesheet" href="<?= $theme_url ?>/css/style.css">
<!-- Styles print (paged js) -->
<link rel="stylesheet" href="<?= $theme_url ?>/js/print/pagedjs.css">
<!-- Styles print -->
<link rel="stylesheet" href="<?= $theme_url ?>/css/print.css" media="print">    

<!-- Citation et bibliographie -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/citation-js/0.7.20/citation.min.js"></script>
<script src="<?= $theme_url ?>/js/print/citations-print.js"></script>

<!-- Paged.js -->
<script src="<?= $theme_url ?>/js/print/paged.polyfill.js"></script>
<!-- Sommaire paginé -->
<script src="<?= $theme_url ?>/js/print/createToc.js"></script> 
<!-- Reload in place -->
<script src="<?= $theme_url ?>/js/print/reloadInPlace.js"></script> 
<!-- Notes de bas de page -->
<script src="<?= $theme_url ?>/js/print/footNotes.js"></script> 
<!-- URLs trop longues -->
<script src="<?= $theme_url ?>/js/print/breakUrls.js"></script> 
<!-- On print -->
<script src="<?= $theme_url ?>/js/print/onPrint.js"></script>

<!-- Aide pour la mise en page des images -->
<?php if(isset($_GET["layout"])): ?>
  <script src="<?= $theme_url ?>/js/layout/turndown.js"></script>
  <script src="<?= $theme_url ?>/js/layout/layout.js"></script>    
  <link rel="stylesheet" href="<?= $theme_url ?>/js/layout/layout.css" media="screen">
<?php endif ?>


<script>
window.addEventListener('DOMContentLoaded', () => {
  window.Cite = require('citation-js');
  CitationManager.loadBibFile("content/ref/bib.bib").then(() => {
    // On pointe vers le conteneur source que PagedJS va paginer
    // Adaptez ce sélecteur selon votre config.php de page-type-to-print
    CitationManager.processPagedJS([
      "body",           // ou le sélecteur réel de votre contenu source
    ]);
  });
});
</script>