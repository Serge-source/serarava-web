// Serava Retreats — typed site content. Single source of truth.
// Values marked PLACEHOLDER need to be confirmed and updated via the admin.

export type CategorySlug = 'studios' | 'suites' | 'villa'

export interface Category {
  slug: CategorySlug
  name: string
  filter: string
  units: number
  maxGuests: number
  short: string
  description: string
  bedrooms: string
  bathrooms: string
  amenities: [string, string][]
  photo: string
}

export interface Unit {
  id: string
  category: CategorySlug
  name: string
  maxGuests: number
  status: 'Active' | 'Inactive' | 'Hidden'
}

export interface Amenity {
  icon: string
  title: string
  text: string
}

export interface ExploreEntry {
  key: string
  cat: string
  title: string
  text: string
}

export interface GalleryItem {
  id: string
  cat: string
  caption: string
}

export interface SeoEntry {
  key: string
  route: string
  title: string
  description: string
}

export const property = {
  name: 'Serava Retreats',
  tagline: 'Your Private Island Escape',
  blurb: 'Boutique studios, suites and a private villa near Eagle Beach, Aruba.',
}

export const contact = {
  email: 'info@seravaretreats.com',    // PLACEHOLDER
  phone: '+297 000 0000',              // PLACEHOLDER
  whatsapp: 'https://wa.me/2970000000', // PLACEHOLDER
  area: 'Eagle Beach Area, Aruba',
}

export const socials = {
  instagram: '',  // PLACEHOLDER
  facebook: '',   // PLACEHOLDER
}

export const integrations = {
  mapsEmbed: '',      // PLACEHOLDER
  notifyEmail: '',    // PLACEHOLDER
  analyticsId: '',    // PLACEHOLDER
}

export const pages = {
  home: {
    heroEyebrow: 'Eagle Beach · Aruba',
    heroTitle: 'Discover Your Private Island Escape',
    heroSubtitle: 'Experience comfort, tranquility, and island living at Serava Retreats in Aruba.',
    heroPrimary: 'Explore Accommodations',
    heroSecondary: 'Book Your Stay',
    welcomeTitle: 'A boutique retreat moments from Eagle Beach',
    welcomeBody:
      "Serava Retreats is a small collection of eleven accommodations set among tropical gardens in Aruba's Eagle Beach area. Spend mornings by the shared pool, afternoons on the sand and evenings in calm, comfortable rooms made for island living.",
    ctaTitle: 'Your Aruba Escape Awaits',
    ctaBody: 'Get in touch about availability for studios, suites and the Private Villa.',
  },
  about: {
    title: 'A small retreat with a warm Caribbean welcome',
    storyTitle: 'Eleven places to stay, one easy island rhythm',
    storyBody1:
      "Serava Retreats brings together seven studios, three suites and one private villa in Aruba's Eagle Beach area. We kept the property small on purpose, so every guest has room to breathe and the people looking after them know them by name.",
    storyBody2:
      'Whether you are travelling as a couple, a family or a group of friends, Serava is a quiet base from which to enjoy the beach, the island and each other.',
  },
  booking: {
    heading: 'Book Your Stay',
    subheading: 'Your Aruba escape begins here.',
    message:
      'Our online reservation system is coming soon. In the meantime, please contact us directly for accommodation availability and reservation inquiries.',
    primaryLabel: 'Contact Us',
    secondaryLabel: 'Back to Home',
  },
}

export const seo: SeoEntry[] = [
  {
    key: 'home',
    route: '/',
    title: 'Serava Retreats | Boutique Vacation Rentals near Eagle Beach, Aruba',
    description:
      'Serava Retreats offers boutique studios, family suites and a private villa near Eagle Beach, Aruba, with a shared pool, fitness area and tropical outdoor spaces.',
  },
  {
    key: 'accommodations',
    route: '/accommodations',
    title: 'Accommodations | Aruba Studios, Family Suites & Private Villa | Serava Retreats',
    description:
      'Browse Serava Retreats accommodations near Eagle Beach, Aruba: 7 studios for two, 3 family suites for four and a private villa for up to ten guests.',
  },
  {
    key: 'amenities',
    route: '/amenities',
    title: 'Amenities | Pool, Fitness & Tropical Gardens | Serava Retreats Aruba',
    description:
      'Shared swimming pool, fitness area, Wi-Fi, parking, air-conditioning and tropical outdoor spaces at Serava Retreats near Eagle Beach, Aruba.',
  },
  {
    key: 'gallery',
    route: '/gallery',
    title: 'Gallery | Photos of Serava Retreats, Eagle Beach Aruba',
    description:
      'Photo gallery of Serava Retreats: property, studios, suites, private villa, swimming pool and tropical outdoor areas near Eagle Beach, Aruba.',
  },
  {
    key: 'explore',
    route: '/explore-aruba',
    title: 'Explore Aruba | Eagle Beach, Palm Beach & Island Guide | Serava Retreats',
    description:
      'A guide to Eagle Beach, Palm Beach, Arashi Beach, dining, shopping, water activities and attractions near Serava Retreats, Aruba.',
  },
  {
    key: 'about',
    route: '/about',
    title: 'About Us | Serava Retreats, Boutique Accommodations in Aruba',
    description:
      'Serava Retreats is a boutique collection of studios, suites and a private villa near Eagle Beach, Aruba, built around comfort, privacy and thoughtful hospitality.',
  },
  {
    key: 'contact',
    route: '/contact',
    title: 'Contact | Serava Retreats, Eagle Beach Aruba',
    description:
      'Contact Serava Retreats about availability and reservations for studios, suites and the private villa near Eagle Beach, Aruba.',
  },
  {
    key: 'booking',
    route: '/booking',
    title: 'Book Your Stay | Serava Retreats, Aruba',
    description:
      'Book your stay at Serava Retreats near Eagle Beach, Aruba. Online reservations are coming soon; contact us directly for availability.',
  },
  {
    key: 'studios',
    route: '/accommodations/studios',
    title: 'Studios | Serava Retreats, Eagle Beach Aruba',
    description:
      'Seven intimate studios at Serava Retreats near Eagle Beach, Aruba — each with a private kitchenette, air conditioning and access to the shared pool.',
  },
  {
    key: 'suites',
    route: '/accommodations/suites',
    title: 'Family Suites | Serava Retreats, Eagle Beach Aruba',
    description:
      'Three spacious family suites at Serava Retreats near Eagle Beach, Aruba, ideal for couples and families seeking extra room and comfort.',
  },
  {
    key: 'villa',
    route: '/accommodations/villa',
    title: 'Private Villa | Serava Retreats, Eagle Beach Aruba',
    description:
      'The Serava Private Villa — a secluded retreat near Eagle Beach, Aruba, with exclusive amenities for the ultimate island getaway.',
  },
]

export const categories: Category[] = [
  {
    slug: 'studios',
    name: 'Serava Studios',
    filter: 'Studios',
    units: 7,
    maxGuests: 2,
    short: 'Bright, air-conditioned studios for couples and solo travellers, a short walk from Eagle Beach.',
    description:
      'Our seven studios are designed for two. Each one is a calm, private base for beach days and slow evenings, with access to the shared pool and tropical outdoor spaces.',
    bedrooms: 'Studio layout (to be confirmed)', // PLACEHOLDER
    bathrooms: 'To be confirmed',               // PLACEHOLDER
    amenities: [
      ['wind', 'Air-conditioning'],
      ['wifi', 'Wi-Fi'],
      ['waves', 'Pool access'],
      ['car', 'Parking'],
      ['trees', 'Outdoor areas'],
    ],
    photo: 'Studio interior',
  },
  {
    slug: 'suites',
    name: 'Serava Suites',
    filter: 'Suites',
    units: 3,
    maxGuests: 4,
    short: 'Roomier suites for small families and friends travelling together.',
    description:
      'Three suites offer extra space for up to four guests, with the same easy access to the pool, fitness area and Eagle Beach.',
    bedrooms: 'To be confirmed', // PLACEHOLDER
    bathrooms: 'To be confirmed', // PLACEHOLDER
    amenities: [
      ['wind', 'Air-conditioning'],
      ['wifi', 'Wi-Fi'],
      ['waves', 'Pool access'],
      ['car', 'Parking'],
      ['dumbbell', 'Fitness area'],
      ['trees', 'Outdoor areas'],
    ],
    photo: 'Suite living space',
  },
  {
    slug: 'villa',
    name: 'Serava Private Villa',
    filter: 'Private Villa',
    units: 1,
    maxGuests: 10,
    short: 'One private villa for groups and families of up to ten guests.',
    description:
      'The Private Villa is our largest accommodation, made for extended families and groups who want space together while staying close to Eagle Beach.',
    bedrooms: 'To be confirmed', // PLACEHOLDER
    bathrooms: 'To be confirmed', // PLACEHOLDER
    amenities: [
      ['wind', 'Air-conditioning'],
      ['wifi', 'Wi-Fi'],
      ['waves', 'Pool access'],
      ['car', 'Parking'],
      ['dumbbell', 'Fitness area'],
      ['trees', 'Outdoor areas'],
    ],
    photo: 'Private villa exterior',
  },
]

export const units: Unit[] = [
  ...Array.from({ length: 7 }, (_, i) => ({
    id: `studio-${i + 1}`,
    category: 'studios' as CategorySlug,
    name: `Studio ${i + 1}`,
    maxGuests: 2,
    status: 'Active' as const,
  })),
  ...Array.from({ length: 3 }, (_, i) => ({
    id: `suite-${i + 1}`,
    category: 'suites' as CategorySlug,
    name: `Suite ${i + 1}`,
    maxGuests: 4,
    status: 'Active' as const,
  })),
  {
    id: 'villa-1',
    category: 'villa' as CategorySlug,
    name: 'Private Villa',
    maxGuests: 10,
    status: 'Active' as const,
  },
]

export const amenities: Amenity[] = [
  { icon: 'waves', title: 'Shared Swimming Pool', text: 'A calm pool surrounded by sun loungers and tropical planting.' },
  { icon: 'dumbbell', title: 'Small Fitness Area', text: 'Keep up your routine without leaving the property.' },
  { icon: 'wifi', title: 'Wi-Fi', text: 'Wireless internet throughout the property.' },
  { icon: 'car', title: 'Parking', text: 'On-site parking for guests.' },
  { icon: 'wind', title: 'Air-Conditioned Rooms', text: 'Every accommodation is air-conditioned.' },
  { icon: 'trees', title: 'Outdoor Relaxation', text: 'Shaded tropical spaces to read, rest and unwind.' },
  { icon: 'umbrella', title: 'Near Eagle Beach', text: "Close to one of the Caribbean's best-loved beaches." },
]

export const houseRules: string[] = [
  'Check-in and check-out times to be confirmed', // PLACEHOLDER
  'No smoking inside accommodations',
  'Quiet hours in the evening out of respect for other guests',
  'No parties or events without prior approval',
  'Maximum occupancy must be respected',
]

export const explore: ExploreEntry[] = [
  { key: 'eagle', cat: 'Beaches', title: 'Eagle Beach', text: "Wide, soft white sand, calm turquoise water and the island's famous fofoti trees." },
  { key: 'palm', cat: 'Beaches', title: 'Palm Beach', text: 'Gentle waves and a lively strip of beach bars, restaurants and water sports.' },
  { key: 'arashi', cat: 'Beaches', title: 'Arashi Beach', text: 'A quieter beach on the north-west tip, popular for snorkeling in clear water.' },
  { key: 'dining', cat: 'Dining', title: 'Restaurants & Dining', text: 'From beachfront seafood to Aruban specialties like keshi yena and pan bati.' },
  { key: 'shopping', cat: 'Shopping', title: 'Shopping', text: "Boutiques and markets along Oranjestad's Main Street and the waterfront." },
  { key: 'water', cat: 'Activities', title: 'Water Activities', text: 'Snorkeling, catamaran sails, paddleboarding and windsurfing on the west coast.' },
  { key: 'sights', cat: 'Attractions', title: 'Island Attractions', text: 'Arikok National Park, the California Lighthouse and the Alto Vista Chapel.' },
]

export const galleryCats = ['Property', 'Studios', 'Suites', 'Villa', 'Swimming Pool', 'Outdoor Areas']

export const gallery: GalleryItem[] = [
  { id: 'g-prop-1', cat: 'Property', caption: 'Property entrance' },
  { id: 'g-pool-1', cat: 'Swimming Pool', caption: 'Pool and loungers' },
  { id: 'g-studio-1', cat: 'Studios', caption: 'Studio bedroom' },
  { id: 'g-out-1', cat: 'Outdoor Areas', caption: 'Tropical garden' },
  { id: 'g-suite-1', cat: 'Suites', caption: 'Suite living room' },
  { id: 'g-villa-1', cat: 'Villa', caption: 'Villa exterior' },
  { id: 'g-prop-2', cat: 'Property', caption: 'Courtyard' },
  { id: 'g-studio-2', cat: 'Studios', caption: 'Studio bathroom' },
  { id: 'g-pool-2', cat: 'Swimming Pool', caption: 'Pool at dusk' },
  { id: 'g-suite-2', cat: 'Suites', caption: 'Suite bedroom' },
  { id: 'g-villa-2', cat: 'Villa', caption: 'Villa lounge' },
  { id: 'g-out-2', cat: 'Outdoor Areas', caption: 'Shaded seating' },
]

export const adminUsers = [
  { id: 'u1', name: 'Property Owner', email: 'owner@seravaretreats.com', role: 'Owner', status: 'Active' },
  { id: 'u2', name: 'Front Desk', email: 'frontdesk@seravaretreats.com', role: 'Staff', status: 'Invited' },
]
