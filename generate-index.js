// generate-index.js
const fs = require('fs');
const path = require('path');

const POSTS_DIR = path.join(__dirname, 'vikposts');
const files = fs.readdirSync(POSTS_DIR)
  .filter(f => f.endsWith('.md'));

files.sort(); // optioneel: chronologisch/alfabetisch sorteren

fs.writeFileSync(
  path.join(POSTS_DIR, 'index.json'),
  JSON.stringify(files, null, 2)
);

console.log('✅ index.json is bijgewerkt met', files.length, 'posts');

