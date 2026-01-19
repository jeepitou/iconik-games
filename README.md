# Iconik Games Website

Site web statique moderne et responsive pour Iconik Games, avec support bilingue (EN/FR).

## 📁 Structure du Projet

```
iconikgames-website/
├── index.html              # Page principale
├── assets/
│   └── images/            # Images du site
├── css/
│   └── style.css          # Styles CSS
├── js/
│   ├── i18n.js           # Système de traduction
│   └── main.js           # Interactions UI
├── locales/
│   ├── translations.json  # Source des traductions
│   ├── en.json           # Traductions anglaises (généré)
│   └── fr.json           # Traductions françaises (généré)
├── extract-i18n.js        # Script d'extraction des traductions
└── README.md
```

## 🌍 Système de Traduction (i18n)

### Comment ça fonctionne

1. **Fichier source**: `locales/translations.json` contient toutes les traductions dans un format structuré
2. **Extraction**: Le script `extract-i18n.js` génère les fichiers `en.json` et `fr.json`
3. **HTML**: Les éléments utilisent `data-i18n="cle.de.traduction"` au lieu de texte en dur
4. **JavaScript**: Le script `i18n.js` charge et applique les traductions automatiquement

### Ajouter de nouvelles traductions

#### Option 1: Modifier translations.json

```json
{
  "section": {
    "newKey": {
      "en": "English text",
      "fr": "Texte français"
    }
  }
}
```

Puis exécutez:
```bash
node extract-i18n.js
```

#### Option 2: Modifier directement en.json et fr.json

```json
// en.json
{
  "section.newKey": "English text"
}

// fr.json
{
  "section.newKey": "Texte français"
}
```

### Utiliser dans le HTML

```html
<h1 data-i18n="section.newKey"></h1>
```

Le texte sera automatiquement remplacé selon la langue sélectionnée.

## 🎨 Design

- **Style**: Moderne et minimaliste
- **Palette**: Tons orangés avec accents professionnels
- **Typographie**:
  - Inter (texte)
  - Playfair Display (titres)
- **Responsive**: Optimisé pour mobile, tablette et desktop

## 🚀 Démarrage

### Développement Local

1. Ouvrez `index.html` dans un navigateur moderne
2. Ou utilisez un serveur local:

```bash
# Python 3
python -m http.server 8000

# Node.js (avec http-server)
npx http-server

# VS Code Live Server
# Click droit sur index.html > Open with Live Server
```

3. Accédez à `http://localhost:8000`

### Modifier les Traductions

```bash
# 1. Modifiez locales/translations.json
# 2. Régénérez les fichiers de langue
node extract-i18n.js

# Le script affichera:
# ✅ Found X translation keys
# ✅ Created en.json (X keys)
# ✅ Created fr.json (X keys)
# ✅ All translations are complete!
```

## 📱 Fonctionnalités

- ✅ Changement de langue EN/FR avec sauvegarde de préférence
- ✅ Navigation responsive avec menu hamburger
- ✅ Animations au scroll
- ✅ Images optimisées avec placeholders élégants
- ✅ Smooth scroll vers les sections
- ✅ Design moderne pour attirer des artistes
- ✅ Optimisé pour la performance

## 🔧 Technologies

- **HTML5**: Structure sémantique
- **CSS3**: Variables CSS, Grid, Flexbox, animations
- **JavaScript Vanilla**: Pas de framework, léger et rapide
- **i18n**: Système de traduction personnalisé

## 📊 Support Navigateurs

- Chrome/Edge (dernières versions)
- Firefox (dernières versions)
- Safari (dernières versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Objectif

Site vitrine professionnel pour **Iconik Games** visant à:
- Présenter le jeu "Monarchs of Sylleria"
- Attirer des artistes pour collaboration
- Communauté (lien Discord)

## 📝 Licence

© 2024 Iconik Games. Tous droits réservés.

---

**Note**: Le site utilise actuellement des images AI comme placeholders. Des illustrations produites de manière éthique sont en cours de création.
