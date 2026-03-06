export type Product = {
  id: string;
  name: string;
  ean: string;
  brand: string;
  minPrice: number;
  lowestDetected: number;
  totalListings: number;
  violationsCount: number;
  lastChecked: string;
  status: 'ok' | 'warning' | 'critical';
};

export type Listing = {
  id: string;
  productId: string;
  seller: string;
  price: number;
  link: string;
  detectedAt: string;
  isViolation: boolean;
  reputation: 'platinum' | 'gold' | 'silver' | 'bronze';
};

export type PriceHistory = {
  date: string;
  minPrice: number;
  lowestMarket: number;
};

export type Alert = {
  id: string;
  productId: string;
  productName: string;
  seller: string;
  price: number;
  minPrice: number;
  sentAt: string;
  channel: 'email' | 'whatsapp';
  read: boolean;
};

export const products: Product[] = [
  {
    id: '1',
    name: 'Samsung Galaxy A15 128GB',
    ean: '7891234567890',
    brand: 'Samsung',
    minPrice: 299990,
    lowestDetected: 264990,
    totalListings: 18,
    violationsCount: 4,
    lastChecked: 'Hoy 10:00 AM',
    status: 'critical',
  },
  {
    id: '2',
    name: 'LG Smart TV 55" 4K UHD',
    ean: '7891234567891',
    brand: 'LG',
    minPrice: 449990,
    lowestDetected: 439990,
    totalListings: 11,
    violationsCount: 1,
    lastChecked: 'Hoy 10:00 AM',
    status: 'warning',
  },
  {
    id: '3',
    name: 'Sony WH-1000XM5 Auriculares',
    ean: '7891234567892',
    brand: 'Sony',
    minPrice: 189990,
    lowestDetected: 189990,
    totalListings: 7,
    violationsCount: 0,
    lastChecked: 'Hoy 10:00 AM',
    status: 'ok',
  },
  {
    id: '4',
    name: 'Xiaomi Redmi Note 13 256GB',
    ean: '7891234567893',
    brand: 'Xiaomi',
    minPrice: 219990,
    lowestDetected: 199990,
    totalListings: 23,
    violationsCount: 6,
    lastChecked: 'Hoy 10:00 AM',
    status: 'critical',
  },
  {
    id: '5',
    name: 'Philips Airfryer XL HD9270',
    ean: '7891234567894',
    brand: 'Philips',
    minPrice: 89990,
    lowestDetected: 89990,
    totalListings: 5,
    violationsCount: 0,
    lastChecked: 'Hoy 10:00 AM',
    status: 'ok',
  },
  {
    id: '6',
    name: 'Asus ROG Strix G16 RTX 4060',
    ean: '7891234567895',
    brand: 'Asus',
    minPrice: 1299990,
    lowestDetected: 1249990,
    totalListings: 9,
    violationsCount: 2,
    lastChecked: 'Hoy 10:00 AM',
    status: 'warning',
  },
  {
    id: '7',
    name: 'Samsung Galaxy S24 256GB',
    ean: '7891234567896',
    brand: 'Samsung',
    minPrice: 699990,
    lowestDetected: 699990,
    totalListings: 14,
    violationsCount: 0,
    lastChecked: 'Hoy 10:00 AM',
    status: 'ok',
  },
  {
    id: '8',
    name: 'LG Lavadora AI DD 12kg',
    ean: '7891234567897',
    brand: 'LG',
    minPrice: 549990,
    lowestDetected: 519990,
    totalListings: 8,
    violationsCount: 2,
    lastChecked: 'Hoy 10:00 AM',
    status: 'warning',
  },
];

export const listings: Listing[] = [
  // Producto 1 - Samsung Galaxy A15
  { id: 'l1', productId: '1', seller: 'TechZone_Chile', price: 264990, link: 'https://www.mercadolibre.cl/MLC-2145678901', detectedAt: 'Hoy 10:02 AM', isViolation: true, reputation: 'gold' },
  { id: 'l2', productId: '1', seller: 'MegaStore CL', price: 279990, link: 'https://www.mercadolibre.cl/MLC-2145678902', detectedAt: 'Hoy 10:02 AM', isViolation: true, reputation: 'platinum' },
  { id: 'l3', productId: '1', seller: 'Electronica_Sur', price: 289990, link: 'https://www.mercadolibre.cl/MLC-2145678903', detectedAt: 'Hoy 10:02 AM', isViolation: true, reputation: 'silver' },
  { id: 'l4', productId: '1', seller: 'ShopFast_CL', price: 295000, link: 'https://www.mercadolibre.cl/MLC-2145678904', detectedAt: 'Hoy 10:02 AM', isViolation: true, reputation: 'gold' },
  { id: 'l5', productId: '1', seller: 'Samsung Oficial', price: 299990, link: 'https://www.mercadolibre.cl/MLC-2145678905', detectedAt: 'Hoy 10:02 AM', isViolation: false, reputation: 'platinum' },
  { id: 'l6', productId: '1', seller: 'Lider Tecnologia', price: 305000, link: 'https://www.mercadolibre.cl/MLC-2145678906', detectedAt: 'Hoy 10:02 AM', isViolation: false, reputation: 'platinum' },
  // Producto 2 - LG Smart TV
  { id: 'l7', productId: '2', seller: 'Electrohogar_CL', price: 439990, link: 'https://www.mercadolibre.cl/MLC-2245678901', detectedAt: 'Ayer 10:10 PM', isViolation: true, reputation: 'gold' },
  { id: 'l8', productId: '2', seller: 'Multitienda_Sur', price: 449990, link: 'https://www.mercadolibre.cl/MLC-2245678902', detectedAt: 'Ayer 10:10 PM', isViolation: false, reputation: 'silver' },
  { id: 'l9', productId: '2', seller: 'LG Chile Oficial', price: 449990, link: 'https://www.mercadolibre.cl/MLC-2245678903', detectedAt: 'Ayer 10:10 PM', isViolation: false, reputation: 'platinum' },
  { id: 'l10', productId: '2', seller: 'HomeSmart CL', price: 459990, link: 'https://www.mercadolibre.cl/MLC-2245678904', detectedAt: 'Ayer 10:10 PM', isViolation: false, reputation: 'gold' },
  // Producto 3 - Sony WH-1000XM5
  { id: 'l11', productId: '3', seller: 'Sony Chile', price: 189990, link: 'https://www.mercadolibre.cl/MLC-2345678901', detectedAt: 'Hoy 10:02 AM', isViolation: false, reputation: 'platinum' },
  { id: 'l12', productId: '3', seller: 'AudioTech CL', price: 194990, link: 'https://www.mercadolibre.cl/MLC-2345678902', detectedAt: 'Hoy 10:02 AM', isViolation: false, reputation: 'gold' },
  { id: 'l13', productId: '3', seller: 'SonidoPro', price: 199990, link: 'https://www.mercadolibre.cl/MLC-2345678903', detectedAt: 'Hoy 10:02 AM', isViolation: false, reputation: 'silver' },
  // Producto 4 - Xiaomi Redmi Note 13
  { id: 'l14', productId: '4', seller: 'MovilStore_CL', price: 199990, link: 'https://www.mercadolibre.cl/MLC-2445678901', detectedAt: 'Hoy 10:02 AM', isViolation: true, reputation: 'gold' },
  { id: 'l15', productId: '4', seller: 'CelularesExpress', price: 203990, link: 'https://www.mercadolibre.cl/MLC-2445678902', detectedAt: 'Hoy 10:02 AM', isViolation: true, reputation: 'silver' },
  { id: 'l16', productId: '4', seller: 'TechImports CL', price: 207990, link: 'https://www.mercadolibre.cl/MLC-2445678903', detectedAt: 'Hoy 10:02 AM', isViolation: true, reputation: 'bronze' },
  { id: 'l17', productId: '4', seller: 'DigiShop Norte', price: 209990, link: 'https://www.mercadolibre.cl/MLC-2445678904', detectedAt: 'Hoy 10:02 AM', isViolation: true, reputation: 'gold' },
  { id: 'l18', productId: '4', seller: 'PhoneZone Chile', price: 212990, link: 'https://www.mercadolibre.cl/MLC-2445678905', detectedAt: 'Hoy 10:02 AM', isViolation: true, reputation: 'silver' },
  { id: 'l19', productId: '4', seller: 'Xiaomi Oficial CL', price: 219990, link: 'https://www.mercadolibre.cl/MLC-2445678906', detectedAt: 'Hoy 10:02 AM', isViolation: false, reputation: 'platinum' },
  { id: 'l20', productId: '4', seller: 'MegaCelular', price: 224990, link: 'https://www.mercadolibre.cl/MLC-2445678907', detectedAt: 'Hoy 10:02 AM', isViolation: false, reputation: 'gold' },
  // Producto 5 - Philips Airfryer
  { id: 'l21', productId: '5', seller: 'Philips Chile', price: 89990, link: 'https://www.mercadolibre.cl/MLC-2545678901', detectedAt: 'Hoy 10:02 AM', isViolation: false, reputation: 'platinum' },
  { id: 'l22', productId: '5', seller: 'HomeChef CL', price: 91990, link: 'https://www.mercadolibre.cl/MLC-2545678902', detectedAt: 'Hoy 10:02 AM', isViolation: false, reputation: 'gold' },
  // Producto 6 - Asus ROG
  { id: 'l23', productId: '6', seller: 'GamerZone_CL', price: 1249990, link: 'https://www.mercadolibre.cl/MLC-2645678901', detectedAt: 'Ayer 10:10 PM', isViolation: true, reputation: 'gold' },
  { id: 'l24', productId: '6', seller: 'PCMaster Chile', price: 1259990, link: 'https://www.mercadolibre.cl/MLC-2645678902', detectedAt: 'Ayer 10:10 PM', isViolation: true, reputation: 'silver' },
  { id: 'l25', productId: '6', seller: 'Asus Chile', price: 1299990, link: 'https://www.mercadolibre.cl/MLC-2645678903', detectedAt: 'Ayer 10:10 PM', isViolation: false, reputation: 'platinum' },
  // Producto 8 - LG Lavadora
  { id: 'l26', productId: '8', seller: 'HomeAppliances CL', price: 519990, link: 'https://www.mercadolibre.cl/MLC-2845678901', detectedAt: 'Hoy 09:30 AM', isViolation: true, reputation: 'gold' },
  { id: 'l27', productId: '8', seller: 'ElectroSur', price: 529990, link: 'https://www.mercadolibre.cl/MLC-2845678902', detectedAt: 'Hoy 09:30 AM', isViolation: true, reputation: 'silver' },
  { id: 'l28', productId: '8', seller: 'LG Chile Oficial', price: 549990, link: 'https://www.mercadolibre.cl/MLC-2845678903', detectedAt: 'Hoy 09:30 AM', isViolation: false, reputation: 'platinum' },
];

export const priceHistoryByProduct: Record<string, PriceHistory[]> = {
  '1': [
    { date: '20 Feb', minPrice: 299990, lowestMarket: 299990 },
    { date: '22 Feb', minPrice: 299990, lowestMarket: 295000 },
    { date: '24 Feb', minPrice: 299990, lowestMarket: 289990 },
    { date: '26 Feb', minPrice: 299990, lowestMarket: 285000 },
    { date: '28 Feb', minPrice: 299990, lowestMarket: 279990 },
    { date: '01 Mar', minPrice: 299990, lowestMarket: 274990 },
    { date: '03 Mar', minPrice: 299990, lowestMarket: 264990 },
  ],
  '2': [
    { date: '20 Feb', minPrice: 449990, lowestMarket: 449990 },
    { date: '22 Feb', minPrice: 449990, lowestMarket: 449990 },
    { date: '24 Feb', minPrice: 449990, lowestMarket: 449990 },
    { date: '26 Feb', minPrice: 449990, lowestMarket: 445000 },
    { date: '28 Feb', minPrice: 449990, lowestMarket: 443990 },
    { date: '01 Mar', minPrice: 449990, lowestMarket: 441990 },
    { date: '03 Mar', minPrice: 449990, lowestMarket: 439990 },
  ],
  '3': [
    { date: '20 Feb', minPrice: 189990, lowestMarket: 191990 },
    { date: '22 Feb', minPrice: 189990, lowestMarket: 191990 },
    { date: '24 Feb', minPrice: 189990, lowestMarket: 189990 },
    { date: '26 Feb', minPrice: 189990, lowestMarket: 189990 },
    { date: '28 Feb', minPrice: 189990, lowestMarket: 189990 },
    { date: '01 Mar', minPrice: 189990, lowestMarket: 192990 },
    { date: '03 Mar', minPrice: 189990, lowestMarket: 189990 },
  ],
  '4': [
    { date: '20 Feb', minPrice: 219990, lowestMarket: 219990 },
    { date: '22 Feb', minPrice: 219990, lowestMarket: 215990 },
    { date: '24 Feb', minPrice: 219990, lowestMarket: 212990 },
    { date: '26 Feb', minPrice: 219990, lowestMarket: 209990 },
    { date: '28 Feb', minPrice: 219990, lowestMarket: 205990 },
    { date: '01 Mar', minPrice: 219990, lowestMarket: 203990 },
    { date: '03 Mar', minPrice: 219990, lowestMarket: 199990 },
  ],
  '5': [
    { date: '20 Feb', minPrice: 89990, lowestMarket: 89990 },
    { date: '22 Feb', minPrice: 89990, lowestMarket: 91990 },
    { date: '24 Feb', minPrice: 89990, lowestMarket: 89990 },
    { date: '26 Feb', minPrice: 89990, lowestMarket: 89990 },
    { date: '28 Feb', minPrice: 89990, lowestMarket: 89990 },
    { date: '01 Mar', minPrice: 89990, lowestMarket: 92990 },
    { date: '03 Mar', minPrice: 89990, lowestMarket: 89990 },
  ],
  '6': [
    { date: '20 Feb', minPrice: 1299990, lowestMarket: 1299990 },
    { date: '22 Feb', minPrice: 1299990, lowestMarket: 1289990 },
    { date: '24 Feb', minPrice: 1299990, lowestMarket: 1279990 },
    { date: '26 Feb', minPrice: 1299990, lowestMarket: 1269990 },
    { date: '28 Feb', minPrice: 1299990, lowestMarket: 1265990 },
    { date: '01 Mar', minPrice: 1299990, lowestMarket: 1259990 },
    { date: '03 Mar', minPrice: 1299990, lowestMarket: 1249990 },
  ],
  '7': [
    { date: '20 Feb', minPrice: 699990, lowestMarket: 705990 },
    { date: '22 Feb', minPrice: 699990, lowestMarket: 704990 },
    { date: '24 Feb', minPrice: 699990, lowestMarket: 699990 },
    { date: '26 Feb', minPrice: 699990, lowestMarket: 699990 },
    { date: '28 Feb', minPrice: 699990, lowestMarket: 699990 },
    { date: '01 Mar', minPrice: 699990, lowestMarket: 701990 },
    { date: '03 Mar', minPrice: 699990, lowestMarket: 699990 },
  ],
  '8': [
    { date: '20 Feb', minPrice: 549990, lowestMarket: 549990 },
    { date: '22 Feb', minPrice: 549990, lowestMarket: 545990 },
    { date: '24 Feb', minPrice: 549990, lowestMarket: 539990 },
    { date: '26 Feb', minPrice: 549990, lowestMarket: 535990 },
    { date: '28 Feb', minPrice: 549990, lowestMarket: 529990 },
    { date: '01 Mar', minPrice: 549990, lowestMarket: 524990 },
    { date: '03 Mar', minPrice: 549990, lowestMarket: 519990 },
  ],
};

export const priceHistory = priceHistoryByProduct['1'];

export const alerts: Alert[] = [
  { id: 'a1', productId: '1', productName: 'Samsung Galaxy A15 128GB', seller: 'TechZone_Chile', price: 264990, minPrice: 299990, sentAt: 'Hoy 10:05 AM', channel: 'email', read: false },
  { id: 'a2', productId: '4', productName: 'Xiaomi Redmi Note 13 256GB', seller: 'MovilStore_CL', price: 199990, minPrice: 219990, sentAt: 'Hoy 10:05 AM', channel: 'whatsapp', read: false },
  { id: 'a3', productId: '1', productName: 'Samsung Galaxy A15 128GB', seller: 'MegaStore CL', price: 279990, minPrice: 299990, sentAt: 'Hoy 09:45 AM', channel: 'email', read: false },
  { id: 'a4', productId: '8', productName: 'LG Lavadora AI DD 12kg', seller: 'HomeAppliances CL', price: 519990, minPrice: 549990, sentAt: 'Hoy 09:30 AM', channel: 'email', read: false },
  { id: 'a5', productId: '6', productName: 'Asus ROG Strix G16 RTX 4060', seller: 'GamerZone_CL', price: 1249990, minPrice: 1299990, sentAt: 'Ayer 10:10 PM', channel: 'email', read: true },
  { id: 'a6', productId: '2', productName: 'LG Smart TV 55" 4K UHD', seller: 'Electrohogar_CL', price: 439990, minPrice: 449990, sentAt: 'Ayer 10:10 PM', channel: 'email', read: true },
  { id: 'a7', productId: '4', productName: 'Xiaomi Redmi Note 13 256GB', seller: 'CelularesExpress', price: 203990, minPrice: 219990, sentAt: 'Ayer 03:20 PM', channel: 'whatsapp', read: true },
  { id: 'a8', productId: '4', productName: 'Xiaomi Redmi Note 13 256GB', seller: 'TechImports CL', price: 207990, minPrice: 219990, sentAt: 'Ayer 03:20 PM', channel: 'email', read: true },
];
