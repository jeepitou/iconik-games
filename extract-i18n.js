#!/usr/bin/env node
/**
 * i18n Extraction Script
 * Converts translations.json (English key -> French value) into fr.json
 *
 * Usage: node extract-i18n.js
 */

const fs = require('fs');
const path = require('path');

const TRANSLATIONS_FILE = path.join(__dirname, 'locales', 'translations.json');
const LOCALES_DIR = path.join(__dirname, 'locales');

/**
 * Main extraction function
 */
function extractTranslations() {
  try {
    console.log('🔄 Reading translations.json...');
    const translationsData = fs.readFileSync(TRANSLATIONS_FILE, 'utf8');
    const translations = JSON.parse(translationsData);

    const keyCount = Object.keys(translations).length;
    console.log(`✅ Found ${keyCount} translation keys`);

    // For English, we just use the keys as values
    console.log('🔄 Creating English translations (keys)...');
    const enTranslations = {};
    for (const key in translations) {
      enTranslations[key] = key; // English key is the value itself
    }
    const enPath = path.join(LOCALES_DIR, 'en.json');
    fs.writeFileSync(enPath, JSON.stringify(enTranslations, null, 2), 'utf8');
    console.log(`✅ Created ${enPath} (${Object.keys(enTranslations).length} keys)`);

    // For French, we use the translations
    console.log('🔄 Creating French translations...');
    const frPath = path.join(LOCALES_DIR, 'fr.json');
    fs.writeFileSync(frPath, JSON.stringify(translations, null, 2), 'utf8');
    console.log(`✅ Created ${frPath} (${Object.keys(translations).length} keys)`);

    console.log('\n✨ Extraction complete!\n');
    console.log('You can now use these files with the i18n.js script.');
    console.log('Example HTML: <h1 data-i18n="Iconik Games">Iconik Games</h1>');

  } catch (error) {
    console.error('❌ Error during extraction:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  extractTranslations();
}

module.exports = { extractTranslations };
