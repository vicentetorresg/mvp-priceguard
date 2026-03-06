export type Product = {
  id: string;
  name: string;
  ean: string;
  brand: string;
  image: string;
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
    image: 'https://http2.mlstatic.com/D_NQ_NP_product-1.jpg',
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
    image: 'https://http2.mlstatic.com/D_NQ_NP_product-2.jpg',
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
    image: 'https://http2.mlstatic.com/D_NQ_NP_product-3.jpg',
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
    image: 'https://http2.mlstatic.com/D_NQ_NP_product-4.jpg',
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
    image: 'https://http2.mlstatic.com/D_NQ_NP_product-5.jpg',
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
    image: 'https://http2.mlstatic.com/D_NQ_NP_product-6.jpg',
    minPrice: 1299990,
    lowestDetected: 1249990,
    totalListings: 9,
    violationsCount: 2,
    lastChecked: 'Hoy 10:00 AM',
    status: 'warning',
  },
];

export const listings: Listing[] = [
  {
    id: 'l1',
    productId: '1',
    seller: 'TechZone_Chile',
    price: 264990,
    link: '#',
    detectedAt: 'Hoy 10:02 AM',
    isViolation: true,
    reputation: 'gold',
  },
  {
    id: 'l2',
    productId: '1',
    seller: 'MegaStore_CL',
    price: 279990,
    link: '#',
    detectedAt: 'Hoy 10:02 AM',
    isViolation: true,
    reputation: 'platinum',
  },
  {
    id: 'l3',
    productId: '1',
    seller: 'Electronica_Sur',
    price: 289990,
    link: '#',
    detectedAt: 'Hoy 10:02 AM',
    isViolation: true,
    reputation: 'silver',
  },
  {
    id: 'l4',
    productId: '1',
    seller: 'ShopFast_CL',
    price: 295000,
    link: '#',
    detectedAt: 'Hoy 10:02 AM',
    isViolation: true,
    reputation: 'gold',
  },
  {
    id: 'l5',
    productId: '1',
    seller: 'Samsung_Oficial',
    price: 299990,
    link: '#',
    detectedAt: 'Hoy 10:02 AM',
    isViolation: false,
    reputation: 'platinum',
  },
  {
    id: 'l6',
    productId: '1',
    seller: 'Lider_Tecnologia',
    price: 305000,
    link: '#',
    detectedAt: 'Hoy 10:02 AM',
    isViolation: false,
    reputation: 'platinum',
  },
];

export const priceHistory: PriceHistory[] = [
  { date: '20 Feb', minPrice: 299990, lowestMarket: 299990 },
  { date: '22 Feb', minPrice: 299990, lowestMarket: 295000 },
  { date: '24 Feb', minPrice: 299990, lowestMarket: 289990 },
  { date: '26 Feb', minPrice: 299990, lowestMarket: 285000 },
  { date: '28 Feb', minPrice: 299990, lowestMarket: 279990 },
  { date: '01 Mar', minPrice: 299990, lowestMarket: 274990 },
  { date: '03 Mar', minPrice: 299990, lowestMarket: 264990 },
];

export const alerts: Alert[] = [
  {
    id: 'a1',
    productId: '1',
    productName: 'Samsung Galaxy A15 128GB',
    seller: 'TechZone_Chile',
    price: 264990,
    minPrice: 299990,
    sentAt: 'Hoy 10:05 AM',
    channel: 'email',
    read: false,
  },
  {
    id: 'a2',
    productId: '4',
    productName: 'Xiaomi Redmi Note 13 256GB',
    seller: 'MovilStore_CL',
    price: 199990,
    minPrice: 219990,
    sentAt: 'Hoy 10:05 AM',
    channel: 'whatsapp',
    read: false,
  },
  {
    id: 'a3',
    productId: '6',
    productName: 'Asus ROG Strix G16 RTX 4060',
    seller: 'GamerZone_CL',
    price: 1249990,
    minPrice: 1299990,
    sentAt: 'Ayer 10:10 PM',
    channel: 'email',
    read: true,
  },
  {
    id: 'a4',
    productId: '2',
    productName: 'LG Smart TV 55" 4K UHD',
    seller: 'Electrohogar_CL',
    price: 439990,
    minPrice: 449990,
    sentAt: 'Ayer 10:10 PM',
    channel: 'email',
    read: true,
  },
];
