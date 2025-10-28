# Cyberpunk E-commerce

Une application e-commerce futuriste avec Django REST Framework en backend et React en frontend, utilisant un thème cyberpunk Neon Green/Yellow/Purple.

## 🚀 Fonctionnalités

### Backend (Django)
- **API RESTful** avec Django REST Framework
- **Modèles** : Produits, Catégories, Avis, Panier, Utilisateurs
- **Filtres avancés** : Recherche, prix, catégorie, stock
- **Pagination** automatique
- **CORS** configuré pour le frontend
- **Données de test** cyberpunk incluses

### Frontend (React)
- **Page d'accueil** avec présentation du site
- **Catalogue** avec filtres et recherche avancée
- **Page produit** avec détails complets
- **Thème cyberpunk** avec animations et effets néon
- **Responsive design** pour mobile et desktop
- **Gestion d'état** avec Context API

## 🛠️ Installation et Configuration

### Prérequis
- Python 3.8+
- Node.js 16+
- pip
- npm ou yarn

### Backend (Django)

1. **Naviguer vers le dossier Django** :
```bash
cd "Projet Django SOLO"
```

2. **Installer les dépendances** :
```bash
pip install -r ../requirements.txt
```

3. **Appliquer les migrations** :
```bash
python manage.py makemigrations
python manage.py migrate
```

4. **Créer un superutilisateur** :
```bash
python manage.py createsuperuser
```

5. **Charger les données de test** :
```bash
python create_sample_data.py
```

6. **Lancer le serveur** :
```bash
python manage.py runserver
```

Le backend sera disponible sur `http://localhost:8000`

### Frontend (React)

1. **Naviguer vers le dossier frontend** :
```bash
cd cyberpunk-frontend
```

2. **Installer les dépendances** :
```bash
npm install
```

3. **Lancer le serveur de développement** :
```bash
npm start
```

Le frontend sera disponible sur `http://localhost:3000`

## 📁 Structure du Projet

```
cyberpunk-ecommerce/
├── Projet Django SOLO/          # Backend Django
│   ├── cyberpunk_ecommerce/     # Configuration Django
│   ├── shop/                    # Application principale
│   │   ├── models.py           # Modèles de données
│   │   ├── serializers.py      # Sérialiseurs API
│   │   ├── views.py            # Vues API
│   │   ├── filters.py          # Filtres de recherche
│   │   └── urls.py             # URLs de l'API
│   ├── create_sample_data.py   # Script de données de test
│   └── manage.py               # Script de gestion Django
├── cyberpunk-frontend/          # Frontend React
│   ├── src/
│   │   ├── components/          # Composants React
│   │   ├── pages/              # Pages de l'application
│   │   ├── services/           # Services API
│   │   ├── context/            # Context React
│   │   ├── styles/             # Styles CSS
│   │   ├── App.js              # Composant principal
│   │   └── index.js            # Point d'entrée
│   └── package.json            # Dépendances Node.js
└── requirements.txt            # Dépendances Python
```

## 🎨 Thème Cyberpunk

L'application utilise une palette de couleurs cyberpunk :
- **Neon Green** (#00ff00) - Couleur principale
- **Neon Yellow** (#ffff00) - Accents et highlights
- **Neon Purple** (#ff00ff) - Éléments secondaires
- **Background Dark** (#0a0a0a) - Fond principal
- **Typography** : Orbitron (titres) + Rajdhani (texte)

## 🔧 API Endpoints

### Produits
- `GET /api/products/` - Liste des produits avec filtres
- `GET /api/products/{slug}/` - Détail d'un produit
- `GET /api/products/featured/` - Produits vedettes
- `GET /api/products/search/?q={query}` - Recherche

### Catégories
- `GET /api/categories/` - Liste des catégories
- `GET /api/categories/{slug}/` - Détail d'une catégorie

### Panier
- `GET /api/cart/` - Contenu du panier
- `POST /api/cart/add_item/` - Ajouter au panier
- `POST /api/cart/remove_item/` - Retirer du panier
- `POST /api/cart/update_quantity/` - Modifier quantité

### Avis
- `GET /api/reviews/` - Avis de l'utilisateur
- `POST /api/products/{slug}/add_review/` - Ajouter un avis

## 🎯 Fonctionnalités Principales

### Page d'Accueil
- Présentation du site avec animations
- Section des produits vedettes
- Call-to-action vers le catalogue
- Design cyberpunk immersif

### Catalogue
- Filtres par catégorie, prix, stock
- Recherche textuelle
- Tri par prix, note, date
- Pagination automatique
- Affichage responsive

### Page Produit
- Galerie d'images
- Informations détaillées
- Sélecteur de quantité
- Ajout au panier
- Avis clients
- Métadonnées produit

## 🚀 Déploiement

### Backend
1. Configurer les variables d'environnement
2. Installer les dépendances sur le serveur
3. Appliquer les migrations
4. Collecter les fichiers statiques
5. Configurer le serveur web (Nginx + Gunicorn)

### Frontend
1. Build de production : `npm run build`
2. Servir les fichiers statiques
3. Configurer le proxy vers l'API

## 📝 Notes de Développement

- Le backend utilise SQLite par défaut (facilement remplaçable par PostgreSQL)
- Les images sont stockées localement (configurable pour AWS S3)
- CORS est configuré pour le développement local
- Les données de test incluent des produits cyberpunk réalistes

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🎮 Auteur

Développé avec ❤️ et beaucoup de café ☕ pour créer l'expérience e-commerce cyberpunk ultime !
