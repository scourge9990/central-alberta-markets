const sharp = require('sharp');

const size = 192;
const svg = `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="#003594"/>
  <circle cx="${size/2}" cy="${size/2}" r="${size/2 - 10}" fill="#FFEB43"/>
  <text x="50%" y="55%" font-size="100" text-anchor="middle" fill="#003594">🌾</text>
</svg>`;

sharp(Buffer.from(svg))
  .png()
  .toFile('public/icon-192.png')
  .then(() => {
    const svg512 = svg.replace('192', '512');
    return sharp(Buffer.from(svg512)).png().toFile('public/icon-512.png');
  })
  .then(() => console.log('Icons created!'))
  .catch(console.error);