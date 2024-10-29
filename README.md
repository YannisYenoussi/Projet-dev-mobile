# Projet-dev-mobile

Journal de rêves
Une application mobile immersive pour enregistrer, analyser et partager vos rêves. Journal de rêves propose un espace personnel et intuitif pour explorer le monde onirique en ajoutant des détails sur chaque rêve, y compris les émotions, les personnages, les lieux, et bien plus encore.

Table des matières
Aperçu
Fonctionnalités
Installation
Utilisation
Structure du Projet
Dépendances
Contribuer
Aperçu
Journal de rêves est conçu pour offrir une expérience enrichissante aux utilisateurs qui souhaitent garder une trace de leurs rêves. Chaque rêve peut être enrichi de détails et d’émotions pour permettre une analyse personnelle. L'application est construite avec React Native, permettant une compatibilité sur les plateformes Android et iOS.

Fonctionnalités
Enregistrement de rêves : Ajoutez un titre, une description, et des détails sur chaque rêve (type de rêve, émotion, personnages, lieu, etc.).
Catégorisation des rêves : Ajoutez des mots-clés pour catégoriser et organiser vos rêves.
Type de reve : Souligner le type de reve que vous avez fait(reve lucide, cauchemar, etc)
Interface intuitive : Navigation facile avec une barre d'onglets et des composants visuels pour une expérience utilisateur agréable.
Utilisation de react-native-paper : Pour des éléments d'interface utilisateur modernes et stylisés.
Installation
Prérequis
Node.js et npm installés
Expo CLI installé globalement
React Native configuré pour votre environnement
Étapes
Clonez le dépôt :

bash
Copier le code
git clone  https://github.com/YannisYenoussi/Projet-dev-mobile.git
cd Projet-dev-mobile
Installez les dépendances :

bash
Copier le code
npm install
Exécutez l'application :

bash
Copier le code
expo start
Utilisez l'application Expo Go pour tester l'application sur votre appareil mobile ou un émulateur.(Petit problème à ce niveau la notament sur ios)

Utilisation
Lancez l'application et naviguez vers l'onglet "Ajouter un rêve".
Remplissez les informations de votre rêve : date, type, émotions, personnages, lieux, etc dans le champ de texte.
Soumettez le formulaire pour enregistrer le rêve.
Consultez votre liste de rêves enregistrés pour visualiser et analyser vos entrées.
Le supprimer ultérieurement si voulu.
Structure du Projet
plaintext
Copier le code
.
├── src
│   ├── components      # Composants réutilisables (ex: formulaire de rêve, calendrier)
│   ├── screens         # Écrans principaux de l'application (Ajout de rêve, Liste des rêves)
│   ├── navigation      # Configuration de la navigation
│   ├── assets          # Images et ressources statiques
│   ├── styles          # Styles globaux et thèmes
│   └── utils           # Fonctions utilitaires
├── App.js              # Point d'entrée principal
├── package.json        # Fichier de configuration des dépendances
└── README.md           # Documentation du projet
Dépendances
React Native : Cadre de développement principal pour le mobile.
React Native Paper : Composants UI pour un design épuré et intuitif.
@react-native-community/slider : Pour l'évaluation des émotions et intensités.
@react-native-async-storage/async-storage : Stockage local pour sauvegarder les données de rêve.
expo-router : Gestion de la navigation dans l'application.
Contribuer
Forkez ce dépôt.
Créez votre branche (git checkout -b feature/ma-fonctionnalite).
Commitez vos changements (git commit -m 'Ajout d'une fonctionnalité').
Poussez votre branche (git push origin feature/ma-fonctionnalite).
Ouvrez une pull request.


