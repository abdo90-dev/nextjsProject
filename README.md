# Projet Next.js + Firebase

## 📋 Description

Une application web moderne développée avec Next.js et Firebase, offrant une expérience utilisateur rapide et réactive avec une infrastructure backend robuste et scalable.

## ✨ Fonctionnalités

- **Rendu Hybride** : Support du SSR (Server-Side Rendering) et SSG (Static Site Generation)
- **Authentification** : Gestion complète des utilisateurs avec Firebase Auth
- **Base de Données Temps Réel** : Firestore pour la synchronisation des données
- **Stockage de Fichiers** : Firebase Storage pour les médias
- **Déploiement Automatisé** : Intégration avec Vercel
- **Interface Responsive** : Design adaptatif pour tous les appareils
- **Performance Optimisée** : Chargement rapide et optimisation automatique

## 🛠️ Stack Technique

### Frontend
- **Framework** : Next.js 14
- **Langage** : TypeScript/JavaScript
- **Styling** : CSS Modules / Tailwind CSS
- **Composants** : React Components

### Backend & Services
- **Base de Données** : Firestore (NoSQL)
- **Authentification** : Firebase Authentication
- **Stockage** : Firebase Storage
- **Hosting** : Firebase Hosting / Vercel
- **Functions** : Firebase Cloud Functions

## 🚀 Installation et Configuration

### Prérequis
- Node.js (version 18 ou supérieure)
- npm ou yarn
- Compte Firebase
- Git

### Installation

1. **Cloner le repository**
```bash
git clone https://github.com/abdo90-dev/nextjsProject.git
cd nextjsProject
```

2. **Installer les dépendances**
```bash
npm install
# ou
yarn install
```

3. **Configuration Firebase**

Créer un fichier `.env.local` à la racine du projet :

```env
NEXT_PUBLIC_FIREBASE_API_KEY=votre_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=votre_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=votre_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=votre_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=votre_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=votre_app_id
```

4. **Démarrage du serveur de développement**
```bash
npm run dev
# ou
yarn dev
```

L'application sera accessible sur `http://localhost:3000`

## 📁 Structure du Projet

```
nextjsProject/
├── components/          # Composants React réutilisables
│   ├── ui/             # Composants d'interface utilisateur
│   ├── forms/          # Composants de formulaires
│   └── layout/         # Composants de mise en page
├── pages/              # Pages Next.js (routing automatique)
│   ├── api/           # API Routes
│   ├── auth/          # Pages d'authentification
│   └── dashboard/     # Pages du tableau de bord
├── styles/             # Fichiers de style
├── lib/               # Utilitaires et configurations
│   ├── firebase.js    # Configuration Firebase
│   └── utils.js       # Fonctions utilitaires
├── public/            # Fichiers statiques
├── hooks/             # Hooks React personnalisés
└── types/             # Définitions TypeScript
```

## 🔧 Scripts Disponibles

```bash
# Développement
npm run dev

# Build de production
npm run build

# Démarrage en mode production
npm start

# Linting
npm run lint

# Tests
npm run test

# Déploiement Firebase
npm run deploy
```

## 🔐 Authentification

### Comptes de Démonstration

Pour tester l'application directement, utilisez ces identifiants de démonstration :

**Compte de Test Principal :**
- **Email :** haddadiabdelhak64@gmail.com  
- **Mot de passe :** Callman1234


### Types d'Authentification Supportés

Le projet utilise Firebase Authentication avec support pour :

- **Connexion par email/mot de passe**
- **Connexion avec Google**
- **Connexion avec GitHub** (optionnel)
- **Réinitialisation de mot de passe**
- **Vérification d'email**

### Exemple d'utilisation

```javascript
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';

const handleLogin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('Utilisateur connecté:', userCredential.user);
  } catch (error) {
    console.error('Erreur de connexion:', error.message);
  }
};
```

## 📊 Base de Données Firestore

### Structure des Collections

```
users/
├── {userId}/
│   ├── email: string
│   ├── displayName: string
│   ├── createdAt: timestamp
│   └── profile: object

posts/
├── {postId}/
│   ├── title: string
│   ├── content: string
│   ├── authorId: string
│   ├── createdAt: timestamp
│   └── updatedAt: timestamp
```

### Exemple de requête

```javascript
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../lib/firebase';

const getUserPosts = async (userId) => {
  const q = query(
    collection(db, 'posts'), 
    where('authorId', '==', userId)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};
```

## 🎨 Styling et UI

- **CSS Modules** pour les styles scopés
- **Tailwind CSS** pour un design utilitaire
- **Composants réutilisables** avec props typées
- **Design responsive** mobile-first

## 📱 Fonctionnalités Principales

### Dashboard Utilisateur
- Profil utilisateur personnalisable
- Gestion des données personnelles
- Historique des activités

### Gestion de Contenu
- Création et édition de contenus
- Upload de fichiers et images
- Système de commentaires

### Interface Admin
- Gestion des utilisateurs
- Modération de contenu
- Statistiques et analytics

## 🚀 Déploiement

### Vercel (Recommandé)
```bash
# Installation Vercel CLI
npm i -g vercel

# Déploiement
vercel --prod
```

### Firebase Hosting
```bash
# Installation Firebase CLI
npm install -g firebase-tools

# Login Firebase
firebase login

# Déploiement
npm run build
firebase deploy
```

## 🔧 Configuration Avancée

### Variables d'Environnement
```env
# Développement
NEXT_PUBLIC_APP_ENV=development

# Production
NEXT_PUBLIC_APP_ENV=production

# API Keys
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
```

### Optimisation des Performances
- **Image Optimization** avec `next/image`
- **Code Splitting** automatique
- **Lazy Loading** des composants
- **Caching** intelligent

## 🧪 Tests

```bash
# Tests unitaires
npm run test

# Tests e2e avec Cypress
npm run cypress:open

# Coverage
npm run test:coverage
```

## 📈 Monitoring et Analytics

- **Google Analytics** intégré
- **Firebase Performance Monitoring**
- **Error Tracking** avec Sentry (optionnel)
- **User Analytics** avec Firebase Analytics

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit les modifications (`git commit -am 'Ajout nouvelle fonctionnalité'`)
4. Push sur la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Créer une Pull Request

## 📝 Conventions de Code

- **ESLint** pour la qualité du code
- **Prettier** pour le formatage
- **Husky** pour les pre-commit hooks
- **Conventional Commits** pour les messages

## 🐛 Résolution de Problèmes

### Problèmes Courants

**Erreur de configuration Firebase**
```bash
# Vérifier les variables d'environnement
echo $NEXT_PUBLIC_FIREBASE_API_KEY
```

**Problème de build**
```bash
# Nettoyer le cache Next.js
rm -rf .next
npm run build
```

**Erreurs d'authentification**
```bash
# Vérifier les règles de sécurité Firestore
# Vérifier la configuration des domaines autorisés
```

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Contact

- **Développeur** : Abdelhak Haddadi
- **GitHub** : [@abdo90-dev](https://github.com/abdo90-dev)
- **Email** : haddadiabdelhak64@gmail.com

## 🙏 Remerciements

- Équipe Next.js pour le framework
- Google Firebase pour les services backend
- Communauté React pour l'écosystème
- Contributors et testeurs

---

*Développé avec ❤️ en utilisant Next.js et Firebase*
