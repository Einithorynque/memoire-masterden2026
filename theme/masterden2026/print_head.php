<!-- Styles communs -->
<link rel="stylesheet" href="<?= $theme_url ?>/css/style.css">
<!-- Styles print (paged js) -->
<link rel="stylesheet" href="<?= $theme_url ?>/js/print/pagedjs.css">
<!-- Styles print -->
<link rel="stylesheet" href="<?= $theme_url ?>/css/print.css" media="print">    

<!-- Citation et bibliographie -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/citation-js/0.7.20/citation.min.js"></script>
<script>
        // Ce bundle expose require(), pas Cite directement — on le corrige :
        const Cite = require('citation-js');
        window.Cite = Cite;
</script>
<script src="<?= $theme_url ?>/js/print/citations-print.js"></script>

<script>
    // Empêche Paged.js de démarrer automatiquement
    window.PagedConfig = { auto: false };
</script>
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
    // Charger le .bib avant que Paged ne démarre
    CitationManager.loadBibFile("content/ref/bib.bib ").then(() => {
        console.info("[Init] BibTeX chargé, démarrage de Paged.js…");
        window.PagedPolyfill.preview();
    });
</script>