<header id="header">
    <!-- navigation en header -->
     <div class="nav-principale">
        <a href=""><button>Retour à l'accueil</button></a>
        <div>
            <img src="" alt="">
        </div>
        <a href=""><button id="toggle-btn">Sommaire</button></a>
     </div>

    <div class="header-content">
    <!-- Le titre du mémoire / doc écrit -->
    <h1><?= $title ?></h1>
        <!-- Votre nom -->
        <div class="meta-name"><?= $name ?></div>
    </div>

    <!-- les liens rapides: lire, imprimmer, télécharger -->
    <nav id="quicklinks">
        <a href="#nav">Lire en ligne</a>
        <?php if(empty($pdf)): ?>
            <!-- Il est possible de supprimer ce lien une fois le PDF généré : -->
            <a href="?print" title="Web to print">Imprimer</a>
        <?php else : ?>
            <!-- Modifier l’URL dans config.yml -->
            <a href="<?= $pdf ?>">Télécharger</a>
        <?php endif ?>
    </nav>
</header>

  <!-- la navigation (= le sommaire) -->
 <nav id="nav">
        <ul class="nav-ul">
            <?= $nav() ?>
        </ul>
        <button id="btn-fermer" onclick="goTo('B')">Fermer</button>
</nav>


<main id="main">
    <!-- le contenu -->      
    <?= $html() ?>
</main>