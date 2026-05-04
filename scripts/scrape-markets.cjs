// Web scraper for market data from AlbertaFarmersMarket.com
// Run with: node scripts/scrape-markets.js

const cheerio = require('cheerio');
const https = require('https');

const MARKETS_URL = 'https://www.albertafarmersmarket.com/region/central-alberta/';

function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    });
  });
}

async function scrapeMarkets() {
  try {
    const html = await fetchHtml(MARKETS_URL);
    const $ = cheerio.load(html);
    
    const markets = [];
    
    // Adjust selector based on actual page structure
    $('.market-card, .market-item, .market-listing, .market').each((i, el) => {
      const name = $(el).find('h3, .market-name, .title, h2').first().text().trim();
      const schedule = $(el).find('.schedule, .days-hours, .time, .hours').text().trim();
      
      if (name && name.length < 100) {
        markets.push({ name, schedule: schedule || 'Check website' });
      }
    });
    
    console.log('Found markets:', markets.length);
    console.log(JSON.stringify(markets, null, 2));
    return markets;
  } catch (err) {
    console.error('Scraping error:', err.message);
    return [];
  }
}

scrapeMarkets();

// Hardcoded fallback data (verified markets)
const marketData = [
  {
    name: 'Red Deer Farmers Market',
    slug: 'red-deer',
    address: '43rd St & 48th Ave, Red Deer, AB',
    city: 'Red Deer',
    lat: 52.2697,
    lng: -113.8021,
    schedule: [{ day: 'Saturday', start: '8:00 AM', end: '12:30 PM', startDate: 'May', endDate: 'October' }],
  },
  {
    name: 'Calmar Market on Main',
    slug: 'calmar',
    address: 'Calmar, AB',
    city: 'Calmar',
    lat: 53.2661,
    lng: -113.7050,
    schedule: [{ day: 'Saturday', start: '10:00 AM', end: '1:00 PM', startDate: 'June', endDate: 'September' }],
  },
  {
    name: 'Lacombe Farmers Market',
    slug: 'lacombe',
    address: '5020 C&E Trail, Lacombe, AB',
    city: 'Lacombe',
    lat: 52.4500,
    lng: -113.7300,
    schedule: [{ day: 'Saturday', start: '10:00 AM', end: '1:00 PM' }],
  },
  {
    name: 'Innisfail Growers Market',
    slug: 'innisfail',
    address: 'Hwy 2A, Innisfail, AB',
    city: 'Innisfail',
    lat: 52.0303,
    lng: -114.3269,
    schedule: [
      { day: 'Thursday', start: '3:30 PM', end: '6:30 PM' },
      { day: 'Saturday', start: '8:00 AM', end: '12:30 PM' },
    ],
  },
  {
    name: 'Olds Farmers Market',
    slug: 'olds',
    address: '5612 Highway 27, Olds, AB',
    city: 'Olds',
    lat: 51.7892,
    lng: -114.1066,
    schedule: [{ day: 'Saturday', start: '10:00 AM', end: '2:00 PM' }],
  },
  {
    name: 'Sylvan Lake Farmers Market',
    slug: 'sylvan-lake',
    address: '5002 Lakeside Dr, Sylvan Lake, AB',
    city: 'Sylvan Lake',
    lat: 52.2960,
    lng: -114.0900,
    schedule: [{ day: 'Saturday', start: '9:00 AM', end: '1:00 PM' }],
  },
  {
    name: 'Bentley Farmers Market',
    slug: 'bentley',
    address: '5002 Range Rd 20, Bentley, AB',
    city: 'Bentley',
    lat: 52.4638,
    lng: -114.2598,
    schedule: [{ day: 'Saturday', start: '10:00 AM', end: '2:00 PM' }],
  },
  {
    name: 'Wetaskiwin Farmers Market',
    slug: 'wetaskiwin',
    address: '5204 Hwy 2A, Wetaskiwin, AB',
    city: 'Wetaskiwin',
    lat: 52.9685,
    lng: -113.3807,
    schedule: [{ day: 'Saturday', start: '9:00 AM', end: '1:00 PM' }],
  },
  {
    name: 'Stettler Farmers Market',
    slug: 'stettler',
    address: 'Stettler Recreation Centre, Stettler, AB',
    city: 'Stettler',
    lat: 52.3192,
    lng: -112.9658,
    schedule: [{ day: 'Saturday', start: '9:00 AM', end: '1:00 PM' }],
  },
  {
    name: 'Sundre Farmers Market',
    slug: 'sundre',
    address: 'Mountain View County, Sundre, AB',
    city: 'Sundre',
    lat: 51.7983,
    lng: -114.6394,
    schedule: [{ day: 'Friday', start: '4:00 PM', end: '7:00 PM' }],
  },
];