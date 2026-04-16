<!-- Styles communs -->
<link rel="stylesheet" href="<?= $theme_url ?>/css/style.css">

<!-- Notes de marge -->
<script src="<?= $theme_url ?>/js/screen/sideNotes.js" media="screen"></script>
<!-- Citation et bibliographie -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/citation-js/0.7.20/citation.min.js"></script>
<script src="<?= $theme_url ?>/js/screen/citations.js" defer></script>
 <!-- <script src="<?= $theme_url ?>/js/screen/cite.js"></script> -->
<!-- Scripts communs  -->
<script src="<?= $theme_url ?>/js/screen/script.js" media="screen"></script>

<!-- Aide pour la mise en page des images -->
<?php if(isset($_GET["layout"])): ?>
  <script src="<?= $theme_url ?>/js/layout/turndown.js"></script>
  <script src="<?= $theme_url ?>/js/layout/layout.js"></script>    
  <link rel="stylesheet" href="<?= $theme_url ?>/js/layout/layout.css" media="screen">
<?php endif ?>

