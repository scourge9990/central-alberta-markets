// Central Alberta Markets - Database Client
// Using static data (no database needed for local development)

// Fallback market data - Central Alberta farmers markets, makers markets, and classic car swap meets
export const fallbackMarkets = [
  // Farmers Markets
  { id: 1, name: 'Red Deer Farmers Market', city: 'Red Deer', address: '43rd St & 48th Ave', lat: 52.2697, lng: -113.8021, slug: 'red-deer', schedule: [{ day: 'Saturday', startTime: '8:00 AM', endTime: '12:30 PM' }] },
  { id: 2, name: 'Lacombe Farmers Market', city: 'Lacombe', address: '5020 C&E Trail', lat: 52.4500, lng: -113.7300, slug: 'lacombe', schedule: [{ day: 'Saturday', startTime: '10:00 AM', endTime: '1:00 PM' }] },
  { id: 3, name: 'Sylvan Lake Farmers Market', city: 'Sylvan Lake', address: '5002 Lakeside Dr', lat: 52.2960, lng: -114.0900, slug: 'sylvan-lake', schedule: [{ day: 'Saturday', startTime: '9:00 AM', endTime: '1:00 PM' }] },
  { id: 4, name: 'Innisfail Growers Market', city: 'Innisfail', address: 'Hwy 2A', lat: 52.0303, lng: -114.3269, slug: 'innisfail', schedule: [{ day: 'Thursday', startTime: '3:30 PM', endTime: '6:30 PM' }, { day: 'Saturday', startTime: '8:00 AM', endTime: '12:30 PM' }] },
  { id: 5, name: 'Olds Farmers Market', city: 'Olds', address: '5612 Highway 27', lat: 51.7892, lng: -114.1066, slug: 'olds', schedule: [{ day: 'Saturday', startTime: '10:00 AM', endTime: '2:00 PM' }] },
  { id: 6, name: 'Bentley Farmers Market', city: 'Bentley', address: '5002 Range Rd 20', lat: 52.4638, lng: -114.2598, slug: 'bentley', schedule: [{ day: 'Saturday', startTime: '10:00 AM', endTime: '2:00 PM' }] },
  { id: 7, name: 'Wetaskiwin Farmers Market', city: 'Wetaskiwin', address: '5204 Hwy 2A', lat: 52.9685, lng: -113.3807, slug: 'wetaskiwin', schedule: [{ day: 'Saturday', startTime: '9:00 AM', endTime: '1:00 PM' }] },
  { id: 8, name: 'Stettler Farmers Market', city: 'Stettler', address: 'Stettner Rec Centre', lat: 52.3192, lng: -112.9658, slug: 'stettler', schedule: [{ day: 'Saturday', startTime: '9:00 AM', endTime: '1:00 PM' }] },
  { id: 9, name: 'TEST Markets Test', city: 'Sundre', address: 'Mountain View County', lat: 51.7983, lng: -114.6394, slug: 'sundre', schedule: [{ day: 'Friday', startTime: '4:00 PM', endTime: '7:00 PM' }] },
  { id: 10, name: 'Blackfalds Community Market', city: 'Blackfalds', address: 'Blackfalds Community Centre', lat: 52.3989, lng: -113.8021, slug: 'blackfalds', schedule: [{ day: 'Wednesday', startTime: '3:00 PM', endTime: '7:30 PM' }] },
  // Makers Markets
  { id: 11, name: 'Red Deer Makers Market', city: 'Red Deer', address: 'Hwy 2A', lat: 52.2697, lng: -113.8021, slug: 'red-deer-makers', schedule: [{ day: 'Sunday', startTime: '10:00 AM', endTime: '4:00 PM' }] },
  { id: 12, name: 'Lacombe Handmade Market', city: 'Lacombe', address: 'Hwy 12', lat: 52.4500, lng: -113.7300, slug: 'lacombe-makers', schedule: [{ day: 'Saturday', startTime: '10:00 AM', endTime: '3:00 PM' }] },
  // Classic Car Swap Meets
  { id: 13, name: 'Red Deer Classic Car Swap Meet', city: 'Red Deer', address: 'Westerner Park', lat: 52.2697, lng: -113.8021, slug: 'red-deer-cars', schedule: [{ day: 'Saturday', startTime: '8:00 AM', endTime: '4:00 PM' }] },
  { id: 14, name: 'Innisfail Vintage Parts Show', city: 'Innisfail', address: 'Innisfail Show Centre', lat: 52.0303, lng: -114.3269, slug: 'innisfail-cars', schedule: [{ day: 'Sunday', startTime: '9:00 AM', endTime: '3:00 PM' }] },
  // Music
  { id: 15, name: '🎸 Central Alberta Bands', city: 'Live Music', address: 'All Markets', lat: 52.2697, lng: -113.8021, slug: 'bands', schedule: [{ day: 'Every', startTime: 'Weekend', endTime: 'Live' }], isBands: true },
];

// What's fresh this weekend - static data
export const freshItems = [
  { name: 'Fresh Garden Vegetables', vendor: 'Innisfail Growers', market: 'Innisfail', type: 'produce', emoji: '🥬' },
  { name: 'Artisan Sourdough Bread', vendor: 'Mountain Oven Bakery', market: 'Red Deer', type: 'baked', emoji: '🍞' },
  { name: 'Free-Range Eggs', vendor: 'Sunny Side Farm', market: 'Lacombe', type: 'dairy', emoji: '🧀' },
  { name: 'Local Honey', vendor: 'Bee Happy Apiaries', market: 'Sylvan Lake', type: 'pantry', emoji: '🍯' },
  { name: 'Handmade Goat Cheese', vendor: 'Rocky Mountain Dairy', market: 'Olds', type: 'dairy', emoji: '🧀' },
  { name: 'Fresh Berries', vendor: 'Eagle Lake Berry Farm', market: 'Bentley', type: 'produce', emoji: '🥬' },
];