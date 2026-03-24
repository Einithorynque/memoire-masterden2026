# Partie 1 : Analyse de l'existant
### A : La construction des cartes, outils et objectifs observées:

Un des moyens d'interroger la forme des cartes est d'essayer d'entrevoir par quels outils ces géovisualisations sont réalisées et dans quelles perspectives. Comme énoncé en introduction, il semble y avoir une uniformisation des géovisualisations. Ainsi, on peut supposer qu'il existe des contraintes inhérentes au format, mais aussi dues aux outils, ce qui conduit à une orientation de ces cartes.

#### Une construction orientée :

Tout d'abord, il est bon de rappeler que la carte est un assemblage. C'est-à-dire qu'elle met en commun plusieurs éléments d'informations. Grootens parle même d'un objet de «_ manipulation de données_ »[Grootens]. Cela conduit forcément à une orientation du message en fonction de la construction réalisée. Parmi les formats cartographiques, on observe des récurrences (pas uniquement autour des géovisualisations), notamment dans notre façon d'observer un territoire.

Aujourd’hui, nos cartographies reposent sur une vue à un instant “T”, orientée par un point de vue. Dans leur construction, le point de Sirius est régulièrement utilisé et les représentations de l’espace sont souvent simplifiées[^1]. Le point de Sirius [Terraforma] est une vue zénithale, distante et globale de la représentation d’un espace. Cette schématisation est parfois poussée à l'extrême pour faciliter le portrait de territoires ou de réseaux complexes. Un exemple emblématique est celui de la carte du métro de Londres[« Plan du métro de Londres ». In Wikipédia, 12 juillet 2024], dont la simplification a servi de modèle aux cartographies de transports à travers le monde.

Dessinateur industriel, Harry Beck conçoit la carte du métro de Londres en 1933. Il vient la simplifier, en uniformisant les distances entre les stations, “suivant une grille aux angles à 45°”[Graphéine, Tiphaine. « Évolution du plan de métro de Paris : du plat de spaghetti à la cité futuriste ». Graphéine - Agence de communication Paris Lyon, 29 mars 2017. ] . On parle alors de diagramme schématique. Il apparaît comme une révolution pour la représentation des transports à cette époque et va se démocratiser à une échelle internationale par la suite. Mais cette opération de simplification peut s’avérer complexe. Elle peut trouver des solutions comme avec le plan de Beck, en limitant le degré d’informations qui devait être présent. Néanmoins ce système rencontre des limites dès lors que par choix, on souhaite qu’un plan puisse à la fois montrer 2 niveaux d’informations : en faisant, par exemple, communiquer la surface et le sous-terrain d’une ville, ce qui a une incidence sur la compréhension globale du territoire et donc à terme sur la data literacy.

Cet exemple soulève pourtant un enjeu auquel sont confrontés les cartographes, mais aussi maintenant les « néo cartographes » (pour reprendre le terme de Mericskay [Mericskay]) : celui de la lisibilité de l'information cartographique. Les choix graphiques et les niveaux d'informations dans les cartes sont importants. Ils sont à l'origine de la clarté du discours sur l'espace et les garants de la transmission des informations au sein de celle-ci. 
Dans un second temps, cette simplification du territoire et de ses données souligne également la priorisation qui doit être faite entre les éléments d'une carte. Ce qui induit à nouveau une orientation du message et donc favorise l'intégration de biais rhétoriques. Au-delà d'une orientation du discours, cela met en avant qu'utiliser des formats uniformisés ne peut pas toujours favorablement diffuser l'information. Cela concerne évidemment les formes ajoutées sur les cartes (telles que les puces) mais aussi les fonds cartographiques en eux-mêmes. 
Pourtant la simplification du territoire est parfois nécessaire. Par exemple, elle est mise en exergue pour aller à l’encontre de l’architecture labyrinthique de certaines villes, comme c’est le cas du plan Konovalov, qui simplifie la ville de Paris sous la forme d’un cercle. **Ainsi, il semble toujours y avoir une question d'équilibre à trouver dans les cartes et plus particulièrement dans les géovisualisations, entre lisibilité de l'information, contextualisation (au sens de Boy [Boy]),témoignage des biais rhétoriques et navigation dans les données.** 

_Schéma des possibilités de représentations pour un même territoire [Vous êtes ici]_

#### L’outil une contrainte technique et mentale 

Pour pouvoir analyser les différentes géovisualisations, je me suis basé sur les réutilisations de données ouvertes qui ont été postées sur la plateforme _data.gouv_ entre janvier 2025 et octobre 2025. Cette analyse se base sur la méthodologie employée par Jonathan Gray, (chercheur en _science and technologies studies_), dans _What do data portals do? Tracing the politics of online devices for making data public_[Gray]. Au sein de son étude, il décide d'interroger les plateformes d'open data gouvernementales sous l'angle de la recherche sociale et culturelle. Pour ce faire, il analyse le _front end_ de ces plateformes, notamment en relevant les choix de design et de discours par le reverse wireframing.
J'ai donc employé une méthodologie similaire. À laquelle j'ai ajouté la comptabilisation de la diversité des outils utilisés dans les géovisualisations. Cette analyse a permis de démontrer que le format cartographique était le plus utilisé dans les réutilisations de data.gouv. Afin d'en analyser l'ensemble des formes, j'ai choisi de ne relever qu'un exemple par typologie de géovisualisation. En effet, nombre d'entre elles sont des déclinaisons d'une même logique de représentation. Les exemples sélectionnés serviront de références pour chaque typologie. 
De plus, pour l'analyse de ces outils et ces formats, je me suis concentré uniquement sur les applications et les visualisations. 

_Carte des outils employés sur la plateforme data.gouv entre janvier et octobre 2025._ 

À partir de cette analyse, j'ai également pu tirer une première carte des outils employés.
Comme on peut le voir, les producteurs de réutilisation utilisent une diversité de moyens ayant des fonctions initiales qui diffèrent grandement. Toutefois, on remarque une large utilisation d'outils no-code, ou de code assisté, tels que Streamlit.io ou ArcGIS. Ces outils offrent alors des moyens simples pour pouvoir créer des représentations sans avoir besoin de compétences dans la cartographie, le design, voire dans le développement. Ces cartes sont aussi réglables par différents éléments de sélection ou de contrôles que ces vecteurs techniques peuvent fournir.
De plus, la façon dont sont données à voir les géovisualisations est bien souvent fermée, sans aucune façon de voir le processus de création. En ce sens, Michel Certeau, philosophe et historien, évoque ce manque d'information lié à la production : «_ la carte élimine toute trace des pratiques qui l’ont produites, donnant l’impression que la structure de la carte découle directement de la structure du monde_ »[cité par Noé Guiraud]. Par omission, volontaire ou non, l'information peut s'en retrouver radicalement transformée, orientée. Le fait que ces réutilisations soient fermées empêche également les possibilités de réutilisations des formats cartographiques, ou d'en modifier l'apparence. Pourtant, cela pourrait être utile pour des utilisateurs qui peinent à comprendre les informations données sous un certain format [Boy]. 

_Tableau des outils  utilisés dans les réutilisations de data.gouv entre janvier ey octobre 2025._

Bien que pratiques, ces différents outils d'assistance imposent donc des contraintes techniques et mentales. Ils limitent les possibilités et l’ouverture des représentations. Pour Mericskay, le nouvel internaute cartographe (développeur, designer, etc.) ne possède pas les “_principes élémentaires de la graphique et ne connaît pas le fonctionnement de la communication cartographique, ni les même les fondements de la sémiologie graphique_” [Mericskay(p6)]. Il est alors à la fois guidé et contraint par des solutions logicielles. Avec des outils comme ArcGIS, il va avoir la possibilité d’ajouter ses propres données sur un fond géographique qu’il va pouvoir personnaliser (changer la taille, la couleur, etc). Sans pour autant savoir si c 'est la manière la plus efficiente d'informer sur les données qu’il souhaite représenter.

Ces représentations, qui sont des traductions numériques simplifiées des cartes scientifiques, tendent donc à devenir un langage uniformisé. Celui-ci manque de souplesse. Il est contraint par l’ensemble de signes et d’interactions que lui fournissent ces logiciels et les compétences de ses créateurs. 
De plus, les règles qui le composent ne peuvent pas permettre de répondre à l'ensemble des situations, phénomènes et typologies de données (un point notamment défendu par le cartographe et géographe John Brian Harley [cité dans Palasky], un des fondateurs de la pensée contre-cartographique). 

Grootens [Grootens] observe également cette limitation du format cartographique par « _la démocratisation des outils d’enregistrement et d’édition des données_ ». Avec l’arrivée des technologies GPS et de nouveaux outils de représentation et de diffusion de l’information, le nombre de cartes a augmenté de manière exponentielle. Comme on a pu le constater, les outils par lesquels on peut réaliser ces cartes limitent les possibilités d'interroger le format cartographique. Cela peut représenter un obstacle pour manipuler et comprendre des données au sein de géovisualisations. Pour Grootens, cette uniformisation graphique ne respecte pas les traditions cartographiques et conduit à des cartes illisibles ou à « de la pornographie de données complaisante ». Les auteurs de ces représentations ne s’intéressent pas à interroger le format de la carte ou à repenser les manières de représenter qui lui sont liées. Analyser les récurrences de ces formes et formats permettrait alors d'en déceler les limites et les points sur lesquels se reposer pour explorer d'autres perspectives et ainsi améliorer la _data literacy_. 

### Les récurrences dans les géovisualisations :

À partir de notre analyse précédente, on peut supposer que les formes que prennent les géovisualisations sont similaires et sont limitées en raison des contraintes par l'outil. Cela entraîne alors des récurrences dans leurs formats et leurs usages.
_
#### Les limites identifiées par la récurrence

##### 1- Les objectifs
Une des premières formes de récurrence que l'on observe se trouve dans les objectifs des différentes visualisations de la donnée. 
À partir de la précédente analyse de data.gouv, j'ai pu être en mesure de repérer des objectifs communs entre les différentes réutilisations. Parmi ceux-là on peut retrouver : comptabiliser; avoir un autre point de vue[^2]; comparer; témoigner; rechercher; montrer un lien; indiquer. Ces objectifs sont divers mais témoignent tous d'une volonté d'être en mesure de manipuler différents jeux de données. 
À ceux déjà présents, et après avoir échangé avec Anthony Angelot, je propose de rajouter la collaboration. En effet, dans le cadre des datalabs, il est très courant qu'il y ait plusieurs parties prenantes [entretien Anthony Angelot]. La collaboration peut également être un point intéressant dans la perspective de produire des contre-cartographies, par exemple lors d'ateliers citoyens. 

##### 2 - Les formats
Au regard de ces objectifs pluriels, j'ai pu concevoir différentes analyses des formats cartographiques grâce à plusieurs design spaces. 
Cette méthodologie de classification permet de mettre en avant les récurrences, mais aussi les manques. 
Ces design spaces sont organisés avec deux champs d'entrée. Le premier est les objectifs cités, le second est les typologies de représentations cartographiques. 

_Design space croisant les typologies de représentations de la données géographiques avec les objectifs des visualisations de données._ 

À partir de cette analyse, on observe une seconde récurrence dans les formats cartographiques employés. Les géovisualisations se caractérisent par une forte utilisation des modèles de la carte « scientifique » [Harley] et du plan. Les autres formes de représentations du territoire sont peu utilisées, voire jamais, pour représenter des données. Par exemple, il n'y a aucune utilisation de la représentation en strates, de même pour la coupe, ou la dimension 3D. Il y a une uniformisation autour du point de vue zénithal. Les vues en réseau sont également très peu utilisées. Pourtant, la première thématique des données ouvertes sur data.gouv est la mobilité[^3]. Ainsi, les producteurs de ces cartes se coupent de modes de représentations qui leur permettraient d'expliciter plus clairement leurs données. Des auteurs comme Mericskay ou Grootens s’accordent sur un manque de réflexion sur le format de la carte en lui-même dans les productions.

De plus, on retrouve l'utilisation de fonds cartographique globalement similaire. Ces fonds reposants sur une esthétiques pour la plus part « Google Maps » ou « Open Street Map », participe à un aplanissement des territoires. 

_Outil de comparaison de fond cartographique libre par le site tools.geofabrik.de :_ [https://tools.geofabrik.de/mc/#4/49.0000/8.3778&num=4&mt0=mapnik&mt1=wanderreitkarte&mt2=mapnik-german&mt3=mapnik]]

En effet, comme le souligne Noé Guiraud [Guiraud], cette uniformisation des fonds cartographiques tend à aplanir le monde que l'on perçoit. Le fond cartographique incarne uniquement de manière esthétique le territoire qu'il représente, avec par exemple la possibilité de varier l'espace colorimétrique. Les fonds de cartes ne deviennent alors qu'un style applicable à un territoire (voir l'exemple de sélection d'ArcGIS). Pour Guiraud, cela conduit à un aplanissement structurel, mais aussi culturel.

_Exemples des « styles » applicables sur ArcGIS._ 

On observe donc avec ce premier design space que la structure du fond cartographique et le format de la carte ne sont pas explorés pour les géovisualisations. Cela participe à se priver d'une partie des méthodes d'informations et de communication de la donnée pour un objet qui est pourtant un média [Mericskay].
Cette première observation globale peut être complétée par une analyse plus fine des éléments présents dans les représentations de la cartographie « scientifique ». À partir de l'étude de Mericksay et de mes observations, nous pouvons alors être en mesure d'identifier les autres limites de ces géovisualisations. 

##### 3 - Les composantes visuelles et interactives

Pour Mericskay, les contenus des cartes ont évolué. « Concrètement, des millions de contenus n’ayant pas comme vocation première à être mis sur une carte se voient aujourd’hui indexés spatialement par des manières détournées (géocodage, géotagging, géoparsing). »[Mericskay, p4]. La carte est devenue un moteur de recherche spatiale d'informations. En effet, on retrouve cette abondance de données et de superposition d'informations dans des réutilisations data.gouv, comme avec l'_App où vivre ?_ [App où vivre]. Selon Mericskay, il n’y a alors aucune « _mobilisation de variables visuelles complexes permettant par exemple la différenciation ou la hiérarchisation_ »[Mericskay].
Cela signifie qu'il n'y a pas de réel lien entre les données et les cartes (hormis le positionnement). La carte passe donc d'une représentation d’informations géographiques à un support visuel géographique d’informations. On peut alors considérer la carte comme **un tableau de liège**, où l'on aurait accroché un fond cartographique et sur lequel on va afficher des puces correspondant à des données. Cette métaphore du tableau de liège met en lumière le caractère personnalisable des géovisualisations, et leur capacité à placer des éléments spatialisés sans en requestionner le format (conduisant à l'aplanissement observé par Guiraud).

Dans le cadre de ces cartes « tableau de lièges », Mericskay identifie trois modes de représentations : ponctuel, linéaire et zonal. Chacune de ces modalités représente une façon de donner à voir les données. À celles-ci, je propose également de rajouter « dynamique ». Pour toutes les représentations qui se caractérisent par l'aspect en mouvement et changeant des données présentes à l'intérieur. (par exemple comme le site LiveRain [LiveRain]).
Au sein de ces modes de représentations, un certain nombre de « variables visuelles »  [Mericskay] peuvent être repérées : la taille, la couleur, la forme, la valeur, les puces. Ces deux dernières variables sont omniprésentes. Mericskay identifie une « hégémonie des « punaises cartographiques » [Mericskay]. La valeur, quant à elle, est au cœur de la carte choroplèthe, une des plus utilisées en géovisualisations.

_Design space avec la mise en valeur de l'ensemble des productions ayant l'utilisation de puces._ 

_Design space avec la mise en valeur de l'ensemble des cartes chlorophète._

Ces variables visuelles récurrentes participent donc à une uniformisation des représentations cartographiques. À celles identifiées par Mericskay, je propose d'ajouter les suivantes résultant de mes observations.
En complément de la couleur, on peut ajouter l’opacité. Elle permet de caractériser l’intensité d’un élément et émettre un rapport de valeurs. Elle est également nécessaire pour la superposition et le croisement d’informations.
À cela peut s'adjoindre la position [Vous êtes ici ?], qui se rapproche de l'utilisation des puces géographiques.
Dans le cadre de la modalité « dynamique » des géovisualisations, nous pouvons prendre en compte le mouvement et l'animation des éléments.
Enfin, en complément, s'ajoutent les éléments d'interface interactifs, tels que les fenêtres modales lors du clic sur un élément fixe.

Ces logiques visuelles se retrouvent au sein d'outils mentionnés comme ArcGIS. J'ai décidé d'explorer cette plateforme en créant différentes cartes à partir des moyens fournis et autour d'une situation d'exemple : celle d'un trajet en transport en commun (cette situation sera détaillée par la suite dans notre étude). À partir de cet exercice, nous pouvons faire une synthèse des limites identifiées. Au sein de ce site, un ensemble de fonctions et de fonds de cartes est mis à disposition. L'outil possède une prise en main rapide et intuitive qui permet de réaliser ses premières cartes rapidement. Cependant, ces représentations illustrent parfaitement la logique du « tableau de liège ». Les fonds de cartes deviennent des styles graphiques, contraints par un point de vue zénithal et les mêmes variables visuelles. Bien que l'outil laisse la possibilité d'ajouter ses propres médias (qui peuvent servir d'exploration ou de fonds de cartes), il est difficile de repenser le format de la carte en lui-même. Par exemple, l'introduction de photographies ou d'autres orientations est complexe. On ressent assez vite que ce type d'outil est fait pour disposer des données de manière spatialisée (logique propre au tableau de liège). J'ai rencontré très vite des difficultés en voulant comparer des informations qui s'étendent sur un trajet et qui ne sont pas disposées de manière ponctuelle.

_Carte réalisée sur ArcGIS d'une fausse perception du bruit lors d'un trajet à Lyon en transport en commun._

_Carte réalisée sur ArcGIS d'une fausse perception de l'ennui lors d'un trajet à Lyon en transport en commun._

_Carte réalisée sur ArcGIS comparant de fausses perception de l'ennui et du bruit lors d'un trajet à Lyon en transport en commun._

_Carte réalisée avec l'import d'une propre création de comparaison de données sur un fond ArcGIS lors d'un trajet à Lyon en transport en commun._

Selon moi, ces plateformes se révèlent très pratiques dès lors que l'on souhaite reproduire des typologies de cartes existantes (carte scientifique), mais rencontrent des freins dès lors que l'on souhaite s'écarter des codes habituels des géovisualisations. En particulier, pour rendre les cartes plus compréhensibles qu’elles ne peuvent l’être avec les valeurs visuelles habituelles (voir l'exemple de la carte météorologique). De plus, il est aisé de créer des interactions avec la carte, mais celles-ci sont limitées (utilisation uniquement du clic).

_Carte météorologique mise à disposition sur ArcGIS par explo carto - Normales météorologiques, utilisant la valeur visuelle à puce._

_Carte réalisée sur ArcGIS de faux événements ponctuels interactifs lors d'un trajet à Lyon en transport en commun._

Mericskay définit la dimension interactive d'une géovisualisation comme « la possibilité d’ajouter des données, de les superposer, de changer de fond de carte et surtout d’interagir avec par l’intermédiaire de fenêtres contextuelles ou d’outils de sélection, de tri ou de filtre »[Mericskay]. De plus, selon lui, la dynamique de la carte peut s’exprimer par le changement d’échelle et la possibilité de visualiser des informations de manière superposée. Cette vision limitée des interactions se ressent également dans les observations que j'ai pu faire. En effet, on retrouve régulièrement l'utilisation des mêmes moyens d'interactions avec les cartes (le clic, le hover, etc.). On peut en conclure que la dimension interactive est alors peu investie, et que la pensée actuelle des géographes autour de celle-ci est limitante.
En enrichissant l'interactivité des géovisualisations, on pourrait voir la carte comme un moyen fin d'exploration de données, capable de révéler de nouvelles perspectives [Mericskay], s 'éloignant ainsi de la vision étriquée de la carte « tableau de liège ».

**Résumé des limites :** 
- Privation de certains moyens de communications.
- Un tableau de liège.
- Une récurrence des variations visuelles qui conduisent aux mêmes types de représentations.
- Des interactions avec la carte limitées qui permettraient pourtant d'apporter un regard plus complexe sur les situations géographiques.

#### Les ouvertures identifiées par la récurrence

Les géovisualisations, comme d'autres formes de cartographie, reposent sur des principes de généralisation. Ceux-ci ont été identifiés par Vuillemot, Tabard, Beignon et Rivière dans Boundary Objects in Design Studies: Reflections on the Collaborative Creation of Isochrone Maps [Vuillemot], afin de concevoir de nouvelles cartes isochrones (cartes qui permettent d'indiquer les zones atteignables à partir d'un point donné et selon une durée définie).
La généralisation cartographique est définie par les auteurs comme : _un processus d’ajout, d’enlèvement d’élément existant_. [Vuillemot] Ces différents principes peuvent être résumés dans le tableau suivant :

_Tableau des principes de généralisations identifiées dans l'étude Boundary Objects in Design Studies: Reflections on the Collaborative Creation of Isochrone Maps_

Selon les auteurs, ces principes de généralisation cartographique sont utiles pour faciliter l'interprétation d'informations sur une carte. Par interprétation, ils entendent la capacité à être facilement utilisé par différents types de personnes. Les différents points de généralisation offrent alors de nouvelles perspectives sur les réutilisations de data.gouv, qui peuvent être analysées au sein d’un design space.
À partir de cette nouvelle analyse, les propositions apparaissent plus variées que sur le design space précédent. Cependant, certains points restent très peu, voire pas investis, comme l'exagération. De plus, on constate une récurrence dans les formes en fonction des objectifs ou des principes de généralisation. Par exemple, pour le renforcement, les principales représentations sont des heatmaps.
Ces principes peuvent donc être considérés comme des points ouvrants sur lesquels se reposer pour pouvoir explorer des jeux de données, tout en améliorant la géo literatie des cartes. Cependant, les récurrences présentes démontrent qu'il est nécessaire d'élargir encore le spectre des possibles afin de s'émanciper des limites identifiées précédemment.

_Design space croisant les principes de généralisation avec les objectifs des visualisations de données_

Ce questionnement des représentations n'est pas sans rappeler les travaux sur le point de vie menés au sein de l'ouvrage TERRA FORMA [Aï-Touati]. Dans ce livre de contre-cartographie et de cartographie critique, construit avec des chercheurs et des designers, les autrices s'intéressent au point de vue. Pour elles, cet élément des cartes a tendance à être utilisé pour démontrer une perspective globale sur un territoire. Une situation qu’il est également fréquent de rencontrer au sein des géovisualisations. Cependant, cette notion est complexe, puisqu’elle incorpore un réseau de relations, plus ou moins entremêlées entre différents lieux. C'est pour cela que les autrices tentent de détourner les usages habituels du point de vue en cartographie pour proposer le point de vie. C'est-à-dire une vision qui témoigne d'un large spectre de caractéristiques, reliées entre elles par des relations complexes.

_Schéma du point de vie et sa représentation tel que pensé par les autrices de TERRA FORMA_

En m'inspirant du travail des autrices de TERRA FORMA, je propose de venir requestionner le point de vue utilisé en géovisualisation. Ici, il s'agit de questionner l'usage récurrent du point de Sirius, et de penser également ces représentations sous d'autres perspectives. Par exemple, on pourrait s'inspirer des figures accordées du XVème / XVIème siècle [Blanchis]. Au sein de celles-ci, on superposait plusieurs perspectives. Les quatre côtés de la feuille de la carte pouvaient représenter quatre lignes d’horizon différentes. Les données de la carte suivent alors ces différentes visions. Les plans étaient faits dans l’intérêt d’être un moyen d’échange pour plusieurs personnes assises autour d’une table. Ainsi, questionner le point de vue des géovisualisations permettrait d'offrir de nouvelles perspectives de compréhension des données au sein des cartes. De plus, explorer un approfondissement du lien entre la donnée et le territoire sur lequel elle se situe permettrait de sortir d'une logique du tableau de liège et d'un travail de la carte par couches. 

Il pourrait être intéressant également de proposer d'autres points de vue sur les données par l'interaction. En repensant l'expérience des géovisualisations, on offre la possibilité d'ouvrir vers un approfondissement de l'information. Pour cela, je propose de m'inspirer de ma précédente recherche autour de la position en cartographie. Celle-ci avait déjà permis de démontrer que la dimension interactive des cartes était peu pensée. Il s'agit alors de repenser les manipulations et la navigation dans les cartes. Cela sort du domaine des cartographes, pour s'étendre vers la dimension IHM et du design d'interaction. Ainsi, on vient questionner la définition étriquée de l'interactivité des cartes de Mericskay, en s'appuyant sur de nouveaux éléments (comme la position) et par une recherche-action.
Repenser l'interactivité permet également d’envisager le caractère dynamique des géovisualisations. Afin de ne plus penser celles-ci comme des éléments finis, mais de pouvoir interroger la rhétorique du discours visuel des cartes. Car bien que ces principes de généralisation et d'interaction soient des ouvertures, il faut souligner qu'ils peuvent entraîner une simplification structurelle du territoire [Guiraud] et donc introduire des biais. 

**Résumé des points ouvrants :**
- Les principes de généralisations.
- Le point de vue des géovisualisations.
- L'interactivité et le dynamisme des géovisualisations.

### La carte un objet de rhétorique visuelle uniformisée

#### C.1 Les biais rhétorique

Pour Joost Grootens, le design contribue à la construction du pouvoir des cartes. En effet, celles-ci résultent d'une série de choix sur « les caractéristiques d’un objet à représenter, de la projection d’informations spatiale » et la suppression de certaines « caractéristiques pour réduire la complexité par la généralisation » [Grootens] . Pour le designer, enseignant et écrivain Gui Bonsiepe [cité dans Grootens], dès lors que l’on commence à donner une forme à une information (dont personnellement j’emploierais plus le mot “donnée”), il y a alors l’introduction de biais de rhétorique. 

Pour Grootens, cette manipulation de l'information se produit dès lors que l'on passe d'un territoire à une représentation en deux dimensions. Par les processus de généralisation que l'on a identifiés, une sélection va s'opérer, entraînant avec elle une modification et une orientation des données. Cela passe parfois par l'ajout d'une matérialité à des éléments non tangibles et/ou en mouvement (par exemple les frontières).
« _Les manipulations inhérentes au processus de représentation auront inévitablement des effets rhétoriques influant sur l’interprétation de l’utilisateur, même si ce n’est pas l’intention de l’auteur ou du designer de la carte._ » [Grootens].

De plus, comme le souligne Mericskay, le principal objectif du géoweb actuel est de permettre de visualiser des données. Leur croisement n’est bien souvent qu’un objectif secondaire. Ainsi, cette simplification du territoire ou les choix graphiques qui sont faits deviennent rapidement une instrumentalisation du discours. Comme évoqué dans TERRA FORMA, les cartes chercheraient à promulguer une vue d'ensemble orientée par un point de vue. Selon la théoricienne de l'esthétique Johanna Drucker, les représentations de données laissent à penser qu’elles ne dépendent pas du point de vue de celui qui les observe. Mais en réalité ce sont des « interprétations se faisant passer pour des représentations »[cité dans GROOTENS]. Interroger le point de vue dans les géovisualisations permettrait alors de questionner cette ambiguïté évoquée par Drucker. 

Cette manipulation des données est donc nécessaire, ne serait-ce que pour rendre des phénomènes complexes compréhensibles. « Le fait de rendre lisibles les données ne suffit pas à les rendre compréhensibles. Encore faut-il que le lecteur puisse interpréter et comprendre à quoi les données font référence, tant au niveau des informations représentées, que des formes graphiques mobilisées. »[Mericskay]
Pour Anthony Angelot, il y a une « surcouche » nécessaire à produire pour rendre les données brutes accessibles. Cette couche est perméable aux biais rhétoriques, mais elle permet de dépasser les simples représentations (souvent austères [Boy]) pour aller vers un autre niveau de compréhension.

#### Ouvrir les perspectives pour contrer l'impact de l’uniformisation

Avec la démocratisation de l’écriture cartographique, de nouveaux publics sont amenés à être touchés. Les nouveaux cartographes visent à s’adresser aux grands publics et à faire de la carte le théâtre de la donnée. Au détriment parfois d’un respect de la sémiologie graphique. Cette démocratisation des géovisualisations se caractérise par une uniformisation graphique et interactive. Il faut alors trouver de nouveaux outils et de nouvelles manières de donner à voir la représentation spatiale plus adaptées à des contextes divers et changeant afin de garantir la géo literatie. 

_Pour le moment les solutions en ligne réutilisent pour beaucoup les moyens graphiques existants en essayant de les transposer à ces nouvelles données. Il faut aujourd’hui réfléchir, concevoir et développer de nouveaux systèmes de signes adaptés à la fois aux informations à représenter, à leurs temporalités, aux publics visés comme aux dispositifs mobilisés (à l’image des smartphones)._” [Mericskay (p12-13)]

Pour cela je m'inspire en partie de la critique du travail de Jacques Bertin faite par John Brian Harley, et compilée par Gilles Palsky, professeur à l'université de Paris 1 Panthéon-Sorbonne. Harley dénonce les cartographes et graphistes qui se contentent d’appliquer les règles du système de Bertin, sans en prendre en compte la justesse. Il y a une forme de contentation à juste appliquer ces règles sans plus les questionner. Ce qui ne permet pas de prendre en compte toute la complexité d'un territoire, et notamment sa dimension culturelle ou sociale. Il y a un enfermement de la pensée sous une forme systémique.

De la même manière que Harley, je propose alors de réinterroger les codes habituels des géovisualisations, particulièrement dans une approche interactive. Je souhaite offrir d'autres perspectives sur un territoire, notamment en ouvrant les géovisualisation à d'autres formes de cartographie (comme la contre cartographie), pour sortir du prisme de la carte scientifique. Cela permettrait alors d'envisager les géovisualisatons comme le témoignage de points de vue, démontrant ainsi de l'ambigüité d'une représentation. Voire, nous pourrions considérer la géovisualisation comme un espace d'échange et de collaboration. 
Questionner les points de vue donne également l’occasion de prendre en compte les contraintes des formats. Comme le rappelle Mericskay, les géovisualisations doivent accueillir parfois un volume conséquent d'informations sur des espaces réduits (particulièrement dans le cadre du smartphone). Cela permettrait donc d'adapter la géo literatie sous d'autres médiums.

Ainsi, en s'appuyant sur les critiques existantes et les perspectives que l'on a pu entre ouvrir, il s'agit de repenser le format des géovisualisations. Une question qui touche à la fois leur interactivité, leur dynamisme, leur représentation et la contextualisation des données mises à disposition.



**⚠️ Hypothèse : Il existe une contraintes par l’outils et une orientation des objectifs de la cartographie qui ammène à une uniformisation des représentations**

**A.1 Une construction orientée** 
→ La carte une construction orientée 
→ pour transition Objectifs du géoweb identifié par mericskay : Les variables visuelles

**A.2 Les thématiques** 
→ méthodologie d'analyse de data.gouv → inspiré de celle de Gray
→ Les thématiques et objectifs récurrents dans les réutilisations : 
- Les thématiques abordées témoignent également d'un manque. 

**A.3 L’outil une contrainte technique et mentale** 
→ Carte des outils employés
→ Les outils employés = une contrainte et un guide Mericskay → Une sémiologie graphique axée sur la visualisation de données. Pour Mericskay, le nouvel internaute cartographe (sans expérience) ne possède pas les “principes élémentaires de la graphique et ne connaît pas le fonctionnement de la communication cartographique, ni les même les fondements de la sémiologie graphique”(p6). Il est alors à la fois guidé et contraint par des solutions logiciels. Par des outils comme ArcGIS, il va avoir la possibilité d’ajouter ces propres données sur un fond géographiques qu’il va pouvoir personnaliser (changer la taille, la couleur, etc) sans pour autant savoir si cela convient de la manière la plus efficiente aux données qu’il souhaite représenter.
→ La carte agit comme un média Par ses nouvelles propriétés d’intégration, de partage et de mélange, la carte numérique se comporte comme un outil de communication en ligne, un agrégateur d’informations et de contenus Web, se positionnant comme un média (Sui et Goodchild, 2011 ; Plantin, 2014).”p2


### **B : La récurrence dans les géovisualisations :**
Phrase d'accroche : A partir de notre analyse précédente on peut supposer que les formes que prennent les géovisualisations sont similaires ...
**⚠️ Hypothèse : Les formes que prennent sont similaires et sont limitées dû à une contrainte par l'outils observées présédement.**

**B.1 Les limites identifiées par la récurrence**

→ Première récurrence dans les typologies de cartographies :  
+ Les formes cartographiques ne sont pas diversifiées. Pourtant ces formes existent pour mieux transmettre l'information. Cela revient à se coupé d'une partie des méthodes d'informations.
+ Les mêmes fond cartographiques = aplanissement du territoire autour d'un format google maps
→ Deuxième récurrence à l’intérieur du format géovisualisations  :  les limites : 
+  Mericskay → La carte ne sert juste que de supports de la donnée = logique du tableau de liège.
+  [Mericksay] → Les variables visuelles (concentrations sur les éléments les plus présents comme la valeur, les punaises cartographiques) => Mettre des exemples
+ [Mericskay] → Il définit la dimension interactive d’une cartographique comme : “la possibilité d’ajouter des données, de les superposer, de changer de fond de carte et surtout d’interagir avec par l’intermédiaire de fenêtres contextuelles ou d’outils de sélection, de tri ou de filtre.”(p5) → dans les cartes on visualise des données mais la partie voir plusieurs façon de représenter une même donnée  avoir plusieurs points de vue (intention) n’est pas possible + [Meriskay] : aucune  “ mobilisation de variables visuelles complexes permettant par exemple la différenciation ou la hiérarchisation”(p9).
+ [Mericskay] → “Le fait de rendre lisibles les données ne suffit pas à les rendre compréhensibles. Encore faut-il que le lecteur puisse interpréter et comprendre à quoi les données font référence, tant au niveau des informations représentées, que des formes graphiques mobilisées.”(p5) + [Joost] pornographie de données complaisante.
+ [Mericskay]→ Toujours le même point de vue → différents types de points de vues (Mémoire vous êtes ici) → tableau des points de vues + en finalité un moyen d'échanges

**B.2 Les ouvertures identifiées par la récurrence**

→ Troisièmeréccurence les principes de généralisations → Généralisation Cartographique → qualification de points sur lequel s’appuyer → les points ouvrants 
→ L'exemple de Terraforma = explorer d'autre point de vue le point de vie et les tableaux de représentations des points de vues, différents types de points de vues (Mémoire vous êtes ici) → tableau des points de vues + en finalité un moyen d'échanges
→Investir la dimension interactive, très limité sélectionner des éléments sur la carte ou dans des fenêtres contextuelles ou par effet de hover. Il pourrait intéressant d'ouvrir de nouvelles perspectives sur le territoire par d'autres interactions avec  certains éléments comme la position → Vous êtes ici ? Ou la multi perspective sur un territoire → S'éloigné de la pensée géographe (comme celle de Mericskay, surtout sur l'interaction) pour le design/IHM + intérêt de la recherche par action.
→ Attention à la simplification à ne pas tomber dans une simplification de la données. [Guiraud]
→ Faire des premiers test avec les moyens disponibles pour représenter la donnée → comment ça se ferait

### **C : La carte un objet de rhétorique visuelle uniformisée**

**C.1 Les biais rhétorique**

→ [Joost]]Langage visuel rhétorique →Le design contribue à la construction du pouvoir des cartes 
→ [Joost]réaliser des cartes = manipuler des données → prendre en compte l’ambiguïté et l’incertitude. 
→ Une traduction de la donnée → [Jerémy Boy] + Risque d’ajout de biais 
→ [Joost] Cependant manipulation nécessaire pour rendre les phénomènes compréhensible.
+ [Mericskay] → “Le fait de rendre lisibles les données ne suffit pas à les rendre compréhensibles. Encore faut-il que le lecteur puisse interpréter et comprendre à quoi les données font référence, tant au niveau des informations représentées, que des formes graphiques mobilisées.”(p5) + 
→ Une “surcouche” à produire (Anthony) pour rendre accessible la donnée brute, l’enjeu est d’aller au delà de la simple représentation, mais vers la compréhension _(cf Est-ce que la complexité des données brutes peut être un frein au réemploi de la part des collectivités ou de personnes indépendantes ?)_ 

[Joost] pornographie de données complaisante.
Notamment avec la difficulté des données spatiales [Mericskay]: La cartographie en temps réel vient poser un certains nombre de questions graphiques, de part la diversité d’information a représenté et leur mouvement constant. Il y a un affichage dynamique à la fois des fonds de cartes (qui vont par exemple changer en fonction de l’heure de la journée), et des informations contextuelles. A cela s’ajoute les informations linéaires (routes) et les informations ponctuelles.


**C.2 Ouvrir les perspectives pour contrer l’uniformisation, impact de celle-ci**

→ Le niveau d’uniformisation observé → Fournir des outils pour tous 
→ Même types de représentation critique de Jacques Bertin → enferme les idées.
→ Contriante du format : Mericskay → Il faut aussi prendre en compte le contexte des formats des écrans, qui dans le cas du smartphone, doit distribuer beaucoup d’informations sur un espace restreint (aller voir l’étude des chercheurs taïwanais sur la question). Des formats de cartes qui pourrait mieux convenir à certains types d'écrans aussi. 
→ [Mericksay] En ouvrant les données on autorise leur réutilisation sous d’autres média, ce qui peut être favorable à leur compréhension.
→ Boy + Conclusion Mericskay parfait pour la transition 


[^1]: Voir annexe état de l’art des différents types de cartes recensées ou analyse des réutilisations cartographiques de data.gouv.

[^2]: Au sens de l'intention
[^3]: Résultat de mon analyse de data.gouv
