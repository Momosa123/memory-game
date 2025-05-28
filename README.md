# Memory Game

## Sommaire

- [Description](#description)
- [Fonctionnalités Implémentées](#fonctionnalités-implémentées)
- [Stack Technique](#stack-technique)
- [Prérequis](#prérequis)
- [Installation et Lancement (via Docker)](#installation-et-lancement-via-docker)
- [Structure du Projet](#structure-du-projet)
- [Choix Techniques et Justifications](#choix-techniques-et-justifications)
- [Pistes d'Amélioration Possibles](#pistes-damélioration-possibles)

## Description

Memory Game est une application web full-stack (React + FastAPI) qui propose un jeu de mémoire classique. Les utilisateurs peuvent retourner des cartes pour trouver des paires correspondantes.

## Fonctionnalités Implémentées

- Affichage d'une grille de cartes.
- Niveau de difficulté : 2x2, 4x4, 6x6 cartes.
- Retourner les cartes au clic.
- Vérification des paires correspondantes.
- Comptage du score (nombre de paires trouvées).
- Redémarrage d'une nouvelle partie.
- Mode multijoueur :Permet à plusieurs joueurs de s'affronter.
- Timer lors du jeu en solo
- Récupération des meilleurs scores
- Récupération des statistiques globales

---

## Stack Technique

- **Frontend:**
  - Framework: [Next.js](https://nextjs.org/) (React avec TypeScript)
  - Styling: [Tailwind CSS](https://tailwindcss.com/)
  - Composants UI: [Shadcn/ui](https://ui.shadcn.com/)
  - Gestionnaire de paquets: [pnpm](https://pnpm.io/)
- **Backend:**
  - Framework: [FastAPI](https://fastapi.tiangolo.com/) (Python)
  - Base de données: [SQLite](https://www.sqlite.org/index.html)
  - Validation des données: [Pydantic](https://docs.pydantic.dev/latest/)
- **Conteneurisation:** [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)

---

## Prérequis

- [Docker](https://www.docker.com/products/docker-desktop/) (Docker Desktop recommandé) installé et démarré.

## Installation et Lancement (via Docker)

1.  **Cloner le dépôt :**

    ```bash
    git clone https://github.com/Momosa123/memory-game.git
    cd memory-game
    ```

2.  **Lancer l'application avec Docker Compose :**

    ```bash
    docker-compose up --build
    ```

    - La première fois, Docker construira les images pour le frontend et le backend (cela peut prendre quelques minutes).
    - Les fois suivantes, vous pouvez utiliser `docker-compose up`.

3.  **Accéder à l'application :**

    - Ouvrez votre navigateur et allez sur `http://localhost:3000`.
    - Le backend est accessible sur `http://localhost:8000`.

4.  **Arrêter l'application :**
    - Retournez dans le terminal où `docker-compose up` s'exécute et appuyez sur `Ctrl + C`.

---

## Structure du Projet

```plaintext
memory-game/
├── backend/                     # Code source du backend FastAPI
│   ├── app/                     # Logique de l'application
│   ├── Dockerfile               # Recette Docker pour le backend
│   ├── main.py                  # Point d'entrée FastAPI
├── frontend/                    # Code source du frontend Next.js
│   ├── components/              # Composants React réutilisables
│   ├── hooks/                   # Hooks personnalisés
│   ├── lib/                     # Utilitaires, types, etc.
│   ├── app/                     # Structure de routing Next.js App
│   ├── public/                  # Fichiers statiques
│   ├── Dockerfile               # Recette Docker pour le frontend
│   ├── package.json             # Dépendances et scripts Node.js
│   └── pnpm-lock.yaml           # Lockfile pnpm
├── .github/                     # Workflows GitHub Actions
│   └── workflows/
│       └── ci.yml               # Workflow d'intégration continue
├── .husky/                      # Configuration des hooks pre-commit frontend
├── docker-compose.yml           # Fichier d'orchestration Docker Compose
├── .gitignore                   # Fichiers et dossiers à ignorer par Git
├── .pre-commit-config.yaml      # Configuration des hooks pre-commit backend
├── package.json                 # Dépendances et scripts Node.js (racine)
├── pnpm-lock.yaml               # Lockfile pnpm (racine)
└── README.md                    # Documentation du projet
```

---

## Choix Techniques et Justifications

### Backend

- **FastAPI:** Framework Python moderne, performant et facile à utiliser pour créer des APIs.
- **Pydantic:** Pour la validation des données, garantissant la robustesse des échanges avec le frontend.
- **Docker:** Pour la conteneurisation, assurant un environnement de développement et de déploiement cohérent.
- **uv:** Pour la gestion des dépendances Python.
- **ruff:** Pour le linting et le formatting du code.
- **SQLite:** Pour la base de données.

### Frontend

- **Next.js + TypeScript:** Pour un développement frontend robuste, performant et maintenable.
- **Tailwind CSS:** Pour un styling rapide et personnalisable avec une approche "utility-first".
- **Shadcn/ui:** Pour une base de composants UI accessibles et esthétiques.
- **pnpm:** Gestionnaire de paquets rapide et efficace.
- **ESLint:** Pour le linting du code.
- **Prettier:** Pour le formatting du code.
- **husky:** Pour les hooks pre-commit.
- **lint-staged:** Pour les vérifications avant chaque commit.

#### Qualité du Code et Automatisation

- **Hooks Pre-commit:** Husky et lint-staged (frontend), pre-commit (backend) pour automatiser les vérifications avant chaque commit.
- **Intégration Continue (CI/CD):** GitHub Actions pour exécuter les linters, formatters.
- **Docker:** Pour la conteneurisation, facilitant le déploiement.

---

## Pistes d'Amélioration Possibles

- **Gestion du nombre de coups :** Sauvegarder le nombre de coups
- **Création des noms des joueurs :** Permettre de choisir le nom des joueurs.
- **Sauvegarde de la partie en cours :** Sauvegarder la partie en cours dans le localStorage.
- **Thèmes graphiques :** Permettre de choisir différents sets d'images pour les cartes.
- **Animations :** Ajouter des animations pour le retournement des cartes, les correspondances, etc.
- **Tests unitaires et d'intégration :** Augmenter la couverture de tests.
- **Déploiement :** Mettre en place un pipeline de déploiement continu vers une plateforme (Vercel, Netlify, Heroku, Render, etc.).
