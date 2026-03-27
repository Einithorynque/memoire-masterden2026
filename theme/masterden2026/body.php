<header id="header">
    <!-- navigation en header -->
     <div class="nav-principale">
        <a href=""><button>Retour à l'accueil</button></a>
        <img src="theme/masterden2026/assets/icons-nav-principale.svg" alt="icons">
        <a href=""><button id="toggle-btn">Sommaire</button></a>
     </div>

    <div class="header-content">
    <!-- Le titre du mémoire / doc écrit -->
    <h1><?= $title ?></h1>
        <!-- Votre nom -->
        <div class="meta-name"><?= $name ?></div>
    </div>

    <!-- le titre courant (version print) -->
    <div class="runningtitle">
        <div><span class="name"><?= $name ?></span> <span class="title"><?= $title ?></span></div>
        <span class="folio"></span>
    </div>

    <!-- les méta-données -->
    <div class="meta">
        <!-- l’année YYYY – YYYY  -->
        <div class="meta-year"><?= $year ?></div>
        <!-- Votre nom -->
        <div class="meta-name"><?= $name ?></div>
        <div class="meta-data">
            <!-- Votre diplôme, option et mention -->
            <p>
                <?= $diploma ?> <br>
                <!--<?= $mention ?>-->
            </p>
            <p> Université de Strasbourg
                <!-- Votre pôle éventuel -->
                <!--<?= $pole ?>-->
            </p>
        </div>
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

<footer id="footer">
        <h2>Lire la partie suivante</h2>
        <div id="footer-nav">
            <div id="footer-button-next"></div>
            <hr/>
            <a href="content\text-no-median.md" download="texte-sans-median.md"><button>Télécharger sans les points médians</button></a>
        </div>
</footer>