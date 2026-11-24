// Realistic mock dataset for TravelEase

export const DESTINATIONS = [
  {
    id: 'coxs-bazar',
    name: "Cox's Bazar",
    country: 'Bangladesh',
    tag: 'Longest Sea Beach',
    category: 'Beach',
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80',
    startingPrice: 120,
    servicesCount: '48 Hotels · 32 Buses · 12 Flights',
    popularFor: 'Sunset views, Seafood, Inani Beach, Marine Drive',
    rating: 4.8,
  },
  {
    id: 'sylhet',
    name: 'Sylhet',
    country: 'Bangladesh',
    tag: 'Land of Tea Gardens',
    category: 'Nature',
    image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=800&q=80',
    startingPrice: 85,
    servicesCount: '35 Hotels · 28 Trains · 22 Buses',
    popularFor: 'Ratargul Swamp, Jaflong, Lalakhal, Tea Gardens',
    rating: 4.9,
  },
  {
    id: 'sajek-valley',
    name: 'Sajek Valley',
    country: 'Bangladesh',
    tag: 'Kingdom of Clouds',
    category: 'Hills',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    startingPrice: 95,
    servicesCount: '25 Eco Resorts · 18 Buses · 4x4 Chander Gari',
    popularFor: 'Cloud hugging peaks, Helipad, Konglak Hill, Indigenous Culture',
    rating: 4.9,
  },
  {
    id: 'dhaka',
    name: 'Dhaka',
    country: 'Bangladesh',
    tag: 'Vibrant Capital',
    category: 'City',
    image: 'https://images.unsplash.com/photo-1609137144822-26153c3065b2?auto=format&fit=crop&w=800&q=80',
    startingPrice: 110,
    servicesCount: '90+ Hotels · Central Transit Hub',
    popularFor: 'Lalbagh Fort, Ahsan Manzil, Fine Dining, Shopping',
    rating: 4.6,
  },
  {
    id: 'bangkok',
    name: 'Bangkok',
    country: 'Thailand',
    tag: 'Street Food & Temples',
    category: 'International',
    image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80',
    startingPrice: 280,
    servicesCount: '150+ Hotels · 18 Daily Flights',
    popularFor: 'Grand Palace, Floating Markets, Chao Phraya River, Rooftops',
    rating: 4.8,
  },
  {
    id: 'dubai',
    name: 'Dubai',
    country: 'United Arab Emirates',
    tag: 'Luxury & Modern Wonders',
    category: 'Luxury',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
    startingPrice: 450,
    servicesCount: '220+ Luxury Hotels · Direct Flights',
    popularFor: 'Burj Khalifa, Desert Safari, Palm Jumeirah, Dubai Mall',
    rating: 4.9,
  },
  {
    id: 'singapore',
    name: 'Singapore',
    country: 'Singapore',
    tag: 'Garden City of Future',
    category: 'International',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80',
    startingPrice: 420,
    servicesCount: '130+ Hotels · Non-stop Flights',
    popularFor: 'Marina Bay Sands, Gardens by the Bay, Sentosa Island',
    rating: 4.9,
  },
  {
    id: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    tag: 'Tropical Island Paradise',
    category: 'Island',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    startingPrice: 310,
    servicesCount: '180+ Villas · Island Tours',
    popularFor: 'Ubud Rice Terraces, Uluwatu Temple, Surfing, Beach Clubs',
    rating: 4.9,
  }
];

export const HOTELS = [
  {
    id: 'hotel-1',
    name: 'Sayeman Beach Resort',
    location: "Marine Drive, Cox's Bazar",
    city: "Cox's Bazar",
    country: 'Bangladesh',
    rating: 4.8,
    reviewsCount: 1420,
    pricePerNight: 145,
    originalPrice: 180,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Infinity Pool', 'Private Beach', 'Ocean View', 'Complimentary Breakfast', 'Free High-speed Wi-Fi', 'Spa & Wellness', 'Airport Shuttle'],
    description: 'Experience pure luxury right at the edge of the Bay of Bengal. Sayeman Beach Resort offers legendary hospitality, panoramic ocean-view balconies, an infinity pool overlooking the surf, and signature coastal seafood dining.',
    roomTypes: [
      { id: 'r1', name: 'Infinity Sea View Suite', price: 195, capacity: '2 Adults · 1 Child', bed: '1 King Bed', size: '48 m²', available: 4 },
      { id: 'r2', name: 'Deluxe Ocean Panorama', price: 145, capacity: '2 Adults', bed: '1 Queen Bed', size: '36 m²', available: 6 },
      { id: 'r3', name: 'Executive Family Double', price: 240, capacity: '4 Guests', bed: '2 Queen Beds', size: '56 m²', available: 2 }
    ],
    featured: true,
    badge: 'Best Seller'
  },
  {
    id: 'hotel-2',
    name: 'The Palace Luxury Resort',
    location: 'Bahubal, Habiganj, Sylhet',
    city: 'Sylhet',
    country: 'Bangladesh',
    rating: 4.9,
    reviewsCount: 980,
    pricePerNight: 190,
    originalPrice: 235,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Helipad', 'Private Villas', 'Indoor & Outdoor Pool', 'Tea Garden Views', 'Movie Theater', 'Fine Dining', 'Kids Play Zone'],
    description: 'Set across hundreds of acres of verdant tea hills, The Palace is the crown jewel of luxury in Sylhet, boasting pristine seclusion, private buggy transportation, and opulent multi-cuisine gastronomy.',
    roomTypes: [
      { id: 'r1', name: 'Hilltop Villa Suite', price: 260, capacity: '2 Adults · 2 Children', bed: '1 King Bed', size: '65 m²', available: 3 },
      { id: 'r2', name: 'Tower Deluxe Room', price: 190, capacity: '2 Adults', bed: '1 King Bed', size: '42 m²', available: 5 }
    ],
    featured: true,
    badge: 'Luxury Pick'
  },
  {
    id: 'hotel-3',
    name: 'Radisson Blu Water Garden',
    location: 'Airport Road, Cantonment, Dhaka',
    city: 'Dhaka',
    country: 'Bangladesh',
    rating: 4.7,
    reviewsCount: 2150,
    pricePerNight: 175,
    originalPrice: 210,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Seven-Acre Oasis', 'Golf Putting Green', 'Outdoor Heated Pool', 'Spa & Sauna', 'Airport Pickup', '5 Restaurants'],
    description: 'An idyllic resort-style sanctuary within minutes of Hazrat Shahjalal International Airport. Complete with tranquil water gardens, international buffet spreads, and five-star hospitality.',
    roomTypes: [
      { id: 'r1', name: 'Superior King Room', price: 175, capacity: '2 Adults', bed: '1 King Bed', size: '38 m²', available: 8 },
      { id: 'r2', name: 'Business Class Lounge Access', price: 225, capacity: '2 Adults', bed: '1 King Bed', size: '45 m²', available: 4 }
    ],
    featured: true,
    badge: 'Near Airport'
  },
  {
    id: 'hotel-4',
    name: 'Sajek Megh Machang Eco Resort',
    location: 'Ruilui Para, Sajek Valley',
    city: 'Sajek Valley',
    country: 'Bangladesh',
    rating: 4.9,
    reviewsCount: 760,
    pricePerNight: 75,
    originalPrice: 95,
    image: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Cloud Balcony', 'Traditional Bamboo Architecture', 'Campfire & BBQ', 'Local Tribal Breakfast', 'Stargazing Terrace'],
    description: 'Perched on the ridge of Sajek Valley with direct uninterrupted front-row views of the billowing cloud ocean at sunrise. Eco-friendly architectural wooden cottages with modern comforts.',
    roomTypes: [
      { id: 'r1', name: 'Cloud Deck Wooden Cottage', price: 75, capacity: '2 Adults', bed: '1 Queen Bed', size: '28 m²', available: 4 },
      { id: 'r2', name: 'Family Cloud Suite', price: 110, capacity: '4 Guests', bed: '2 Double Beds', size: '40 m²', available: 2 }
    ],
    featured: true,
    badge: 'Cloud View'
  },
  {
    id: 'hotel-5',
    name: 'The Athenee Hotel, Luxury Collection',
    location: 'Wireless Road, Ploenchit, Bangkok',
    city: 'Bangkok',
    country: 'Thailand',
    rating: 4.9,
    reviewsCount: 3120,
    pricePerNight: 230,
    originalPrice: 290,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Lagoon Style Rooftop Pool', 'Direct BTS SkyTrain Link', 'French-Thai Fusion Dining', 'Michelin Star Chef', 'Athenee Spa'],
    description: 'Built upon the grounds of Kandhavas, the palace of Princess Valaya Alongkorn. Blends French imperial style with timeless Thai elegance in the heart of Bangkok diplomatic district.',
    roomTypes: [
      { id: 'r1', name: 'Athenee Prestige King', price: 230, capacity: '2 Adults', bed: '1 King Bed', size: '46 m²', available: 7 },
      { id: 'r2', name: 'Royal Club Suite', price: 340, capacity: '2 Adults', bed: '1 King Bed', size: '68 m²', available: 3 }
    ],
    featured: false,
    badge: '5-Star Luxury'
  },
  {
    id: 'hotel-6',
    name: 'Atlantis, The Palm',
    location: 'Crescent Road, Palm Jumeirah, Dubai',
    city: 'Dubai',
    country: 'United Arab Emirates',
    rating: 4.9,
    reviewsCount: 5400,
    pricePerNight: 480,
    originalPrice: 620,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Aquaventure Waterpark Included', 'Underwater Aquarium', 'Private 1km Beach', 'Celebrity Restaurants', 'ShuiQi Spa'],
    description: 'Iconic resort destination crown situated on the outer crescent of Palm Jumeirah. Includes complimentary access to the world’s largest waterpark.',
    roomTypes: [
      { id: 'r1', name: 'Ocean King Room', price: 480, capacity: '2 Adults · 1 Child', bed: '1 King Bed', size: '47 m²', available: 5 },
      { id: 'r2', name: 'Palm View Family Suite', price: 750, capacity: '4 Guests', bed: '2 Queen Beds', size: '82 m²', available: 2 }
    ],
    featured: false,
    badge: 'Iconic Wonder'
  }
];

export const FLIGHTS = [
  {
    id: 'fl-101',
    flightNumber: 'BG-433',
    airline: 'Biman Bangladesh Airlines',
    airlineLogo: '✈️',
    from: 'Dhaka',
    fromCode: 'DAC',
    fromAirport: 'Hazrat Shahjalal Intl Airport (Terminal 2)',
    to: "Cox's Bazar",
    toCode: 'CXB',
    toAirport: "Cox's Bazar Airport",
    departureTime: '07:30 AM',
    arrivalTime: '08:35 AM',
    duration: '1h 05m',
    stops: 0,
    stopText: 'Non-stop',
    price: 52,
    cabinClass: 'Economy',
    aircraft: 'Boeing 737-800',
    baggage: '20 kg Check-in + 7 kg Cabin',
    mealsIncluded: true,
    refundable: true,
    seatsLeft: 7,
    rating: 4.6
  },
  {
    id: 'fl-102',
    flightNumber: 'BS-141',
    airline: 'US-Bangla Airlines',
    airlineLogo: '🛫',
    from: 'Dhaka',
    fromCode: 'DAC',
    fromAirport: 'Hazrat Shahjalal Intl Airport (Terminal 1)',
    to: "Cox's Bazar",
    toCode: 'CXB',
    toAirport: "Cox's Bazar Airport",
    departureTime: '11:15 AM',
    arrivalTime: '12:20 PM',
    duration: '1h 05m',
    stops: 0,
    stopText: 'Non-stop',
    price: 58,
    cabinClass: 'Economy',
    aircraft: 'ATR 72-600',
    baggage: '20 kg Check-in + 7 kg Cabin',
    mealsIncluded: true,
    refundable: false,
    seatsLeft: 4,
    rating: 4.7
  },
  {
    id: 'fl-103',
    flightNumber: 'VQ-931',
    airline: 'NOVOAIR',
    airlineLogo: '✈️',
    from: 'Dhaka',
    fromCode: 'DAC',
    fromAirport: 'Hazrat Shahjalal Intl Airport',
    to: 'Sylhet',
    toCode: 'ZYL',
    toAirport: 'Osmani Intl Airport',
    departureTime: '08:45 AM',
    arrivalTime: '09:35 AM',
    duration: '50m',
    stops: 0,
    stopText: 'Non-stop',
    price: 45,
    cabinClass: 'Economy',
    aircraft: 'ATR 72-500',
    baggage: '20 kg Check-in + 7 kg Cabin',
    mealsIncluded: true,
    refundable: true,
    seatsLeft: 9,
    rating: 4.8
  },
  {
    id: 'fl-104',
    flightNumber: 'EK-585',
    airline: 'Emirates',
    airlineLogo: '🌐',
    from: 'Dhaka',
    fromCode: 'DAC',
    fromAirport: 'Hazrat Shahjalal Intl Airport (Terminal 1)',
    to: 'Dubai',
    toCode: 'DXB',
    toAirport: 'Dubai International Airport (Terminal 3)',
    departureTime: '01:40 AM',
    arrivalTime: '05:20 AM',
    duration: '5h 40m',
    stops: 0,
    stopText: 'Direct Non-stop',
    price: 395,
    cabinClass: 'Economy Saver',
    aircraft: 'Boeing 777-300ER',
    baggage: '30 kg Check-in + 7 kg Cabin',
    mealsIncluded: true,
    refundable: true,
    seatsLeft: 5,
    rating: 4.9
  },
  {
    id: 'fl-105',
    flightNumber: 'TG-322',
    airline: 'Thai Airways',
    airlineLogo: '🌸',
    from: 'Dhaka',
    fromCode: 'DAC',
    fromAirport: 'Hazrat Shahjalal Intl Airport',
    to: 'Bangkok',
    toCode: 'BKK',
    toAirport: 'Suvarnabhumi Airport',
    departureTime: '02:00 PM',
    arrivalTime: '05:35 PM',
    duration: '2h 35m',
    stops: 0,
    stopText: 'Non-stop',
    price: 245,
    cabinClass: 'Economy Flex',
    aircraft: 'Airbus A350-900',
    baggage: '25 kg Check-in + 7 kg Cabin',
    mealsIncluded: true,
    refundable: true,
    seatsLeft: 12,
    rating: 4.8
  },
  {
    id: 'fl-106',
    flightNumber: 'SQ-447',
    airline: 'Singapore Airlines',
    airlineLogo: '⭐',
    from: 'Dhaka',
    fromCode: 'DAC',
    fromAirport: 'Hazrat Shahjalal Intl Airport',
    to: 'Singapore',
    toCode: 'SIN',
    toAirport: 'Changi Airport (Terminal 3)',
    departureTime: '11:55 PM',
    arrivalTime: '06:05 AM (+1)',
    duration: '4h 10m',
    stops: 0,
    stopText: 'Non-stop Overnight',
    price: 360,
    cabinClass: 'Economy Value',
    aircraft: 'Boeing 787-10 Dreamliner',
    baggage: '25 kg Check-in + 7 kg Cabin',
    mealsIncluded: true,
    refundable: true,
    seatsLeft: 6,
    rating: 4.95
  }
];

export const BUSES = [
  {
    id: 'bus-201',
    operator: 'Green Line Paribahan',
    coachType: 'Scania Multi-Axle Double Decker (AC)',
    from: 'Dhaka (Sayedabad / Rajarbagh)',
    to: "Cox's Bazar (Kolatoli Point)",
    departureTime: '08:00 AM',
    arrivalTime: '04:30 PM',
    duration: '8h 30m',
    startingPrice: 22,
    rating: 4.8,
    reviewsCount: 840,
    features: ['Reclining Leather Seats', 'Individual USB Port', 'Water Bottle & Snacks', 'Reading Light', 'GPS Tracking', 'On-board Wi-Fi'],
    seatsAvailable: 14,
    boardingPoints: ['Rajarbagh (07:30 AM)', 'Sayedabad (08:00 AM)', 'Arambagh (08:15 AM)'],
    droppingPoints: ['Chakaria (03:30 PM)', 'Link Road (04:00 PM)', 'Kolatoli Dolphin Mor (04:30 PM)']
  },
  {
    id: 'bus-202',
    operator: 'Shohagh Paribahan',
    coachType: 'Scania 2+1 Business Class Sleep Coach',
    from: 'Dhaka (Panthapath)',
    to: "Cox's Bazar (Sugandha Point)",
    departureTime: '10:30 PM',
    arrivalTime: '06:30 AM (+1)',
    duration: '8h 00m',
    startingPrice: 26,
    rating: 4.7,
    reviewsCount: 650,
    features: ['Semi-Sleeper Leather Chairs', 'Individual TV Screen', 'Mineral Water', 'Blanket Provided', 'Clean Rest Stop'],
    seatsAvailable: 9,
    boardingPoints: ['Panthapath (10:00 PM)', 'Sayedabad (10:30 PM)'],
    droppingPoints: ['Jhawtola (06:15 AM)', 'Sugandha Beach Point (06:30 AM)']
  },
  {
    id: 'bus-203',
    operator: 'Saintmartin Travels',
    coachType: 'Hyundai Universe Express Luxury AC',
    from: 'Dhaka (Kalabagan)',
    to: 'Teknaf / Cox’s Bazar',
    departureTime: '09:15 PM',
    arrivalTime: '05:45 AM (+1)',
    duration: '8h 30m',
    startingPrice: 24,
    rating: 4.6,
    reviewsCount: 520,
    features: ['Smooth Air Suspension', 'Emergency Exit', 'Air Conditioned', 'USB Charger'],
    seatsAvailable: 16,
    boardingPoints: ['Kalabagan (08:45 PM)', 'Sayedabad (09:15 PM)'],
    droppingPoints: ['Cox’s Bazar Terminal', 'Teknaf Jetty']
  },
  {
    id: 'bus-204',
    operator: 'Ena Transport (Pvt) Ltd',
    coachType: 'Hino 1J AC Chair Coach',
    from: 'Dhaka (Mohakhali)',
    to: 'Sylhet (Kadamtoli)',
    departureTime: '07:00 AM',
    arrivalTime: '12:30 PM',
    duration: '5h 30m',
    startingPrice: 12,
    rating: 4.5,
    reviewsCount: 920,
    features: ['High Frequency Service', 'AC Air Vent Control', 'Mineral Water', 'Luggage Compartment'],
    seatsAvailable: 21,
    boardingPoints: ['Mohakhali Terminal (07:00 AM)', 'Abdullahpur (07:30 AM)'],
    droppingPoints: ['Shaistaganj (10:45 AM)', 'Sylhet Kadamtoli Bus Terminal (12:30 PM)']
  },
  {
    id: 'bus-205',
    operator: 'Desh Travels',
    coachType: 'Scania Luxury Coach (AC 2+2)',
    from: 'Dhaka (Gabtoli)',
    to: 'Rajshahi',
    departureTime: '08:30 AM',
    arrivalTime: '01:30 PM',
    duration: '5h 00m',
    startingPrice: 15,
    rating: 4.7,
    reviewsCount: 410,
    features: ['Padma Bridge Route', 'AC Fast Chill', 'Water Included', 'Spacious Legroom'],
    seatsAvailable: 12,
    boardingPoints: ['Gabtoli (08:30 AM)', 'Kallyanpur (08:45 AM)'],
    droppingPoints: ['Natore (12:30 PM)', 'Rajshahi Shiroil (01:30 PM)']
  }
];

export const TRAINS = [
  {
    id: 'train-301',
    trainNumber: '701 / 702',
    name: 'Suborna Express',
    from: 'Dhaka (Kamalapur Railway Station)',
    to: 'Chittagong (Chattogram Railway Station)',
    departureTime: '04:30 PM',
    arrivalTime: '09:40 PM',
    duration: '5h 10m',
    startingPrice: 10,
    rating: 4.8,
    reviewsCount: 1100,
    classes: [
      { type: 'Snigdha (AC Chair)', fare: 16, availableSeats: 28 },
      { type: 'Shovon Chair (Non-AC)', fare: 10, availableSeats: 54 },
      { type: 'AC Berth (Sleeper)', fare: 25, availableSeats: 8 }
    ],
    features: ['Non-stop Express', 'Pantry Car Dining', 'Electric Outlets', 'Wheelchair Accessible', 'Security Guarded'],
    stops: ['Dhaka Kamalapur', 'Biman Bandar', 'Chattogram']
  },
  {
    id: 'train-302',
    trainNumber: '709 / 710',
    name: 'Parabat Express',
    from: 'Dhaka (Kamalapur Railway Station)',
    to: 'Sylhet Railway Station',
    departureTime: '06:20 AM',
    arrivalTime: '01:00 PM',
    duration: '6h 40m',
    startingPrice: 9,
    rating: 4.6,
    reviewsCount: 780,
    classes: [
      { type: 'Snigdha (AC Chair)', fare: 14, availableSeats: 22 },
      { type: 'Shovon Chair', fare: 9, availableSeats: 48 },
      { type: 'AC Cabin', fare: 22, availableSeats: 6 }
    ],
    features: ['Scenic Hill Track', 'Tea Garden Panorama', 'Refreshment Cart', 'Luggage Rack'],
    stops: ['Dhaka', 'Biman Bandar', 'Bhairab Bazar', 'Brahmanbaria', 'Sreemangal', 'Sylhet']
  },
  {
    id: 'train-303',
    trainNumber: '787 / 788',
    name: 'Sonar Bangla Express',
    from: 'Dhaka (Kamalapur Railway Station)',
    to: 'Chittagong Railway Station',
    departureTime: '07:00 AM',
    arrivalTime: '12:15 PM',
    duration: '5h 15m',
    startingPrice: 11,
    rating: 4.85,
    reviewsCount: 920,
    classes: [
      { type: 'Snigdha (AC Chair)', fare: 17, availableSeats: 34 },
      { type: 'Shovon Chair', fare: 11, availableSeats: 62 },
      { type: 'AC First Class Cabin', fare: 28, availableSeats: 12 }
    ],
    features: ['Modern Indonesian Coaches', 'LED Information Display', 'Premium On-board Meals'],
    stops: ['Dhaka Kamalapur', 'Biman Bandar', 'Chattogram']
  },
  {
    id: 'train-304',
    trainNumber: '813 / 814',
    name: 'Cox’s Bazar Express',
    from: 'Dhaka (Kamalapur Railway Station)',
    to: "Cox's Bazar Iconic Railway Station",
    departureTime: '10:30 PM',
    arrivalTime: '06:40 AM (+1)',
    duration: '8h 10m',
    startingPrice: 14,
    rating: 4.9,
    reviewsCount: 1650,
    classes: [
      { type: 'Snigdha (AC Chair)', fare: 20, availableSeats: 42 },
      { type: 'Shovon Chair', fare: 14, availableSeats: 70 },
      { type: 'AC Berth (Night Sleeper)', fare: 32, availableSeats: 16 }
    ],
    features: ['Newest Iconic Route', 'Oyster-Shaped Terminal Arrival', 'High-speed Track', 'Clean Western Restrooms'],
    stops: ['Dhaka', 'Biman Bandar', 'Chattogram', 'Cox’s Bazar Oyster Station']
  }
];

export const POPULAR_ROUTES = [
  {
    id: 'route-1',
    from: 'Dhaka',
    to: "Cox's Bazar",
    serviceType: 'flight',
    serviceLabel: 'Flight',
    iconName: 'Plane',
    time: '1h 05m',
    frequency: '18 Daily Flights',
    startingPrice: 52,
    badge: 'Fastest'
  },
  {
    id: 'route-2',
    from: 'Dhaka',
    to: "Cox's Bazar",
    serviceType: 'train',
    serviceLabel: 'Iconic Train',
    iconName: 'Train',
    time: '8h 10m',
    frequency: '2 Daily Direct Trains',
    startingPrice: 14,
    badge: 'Most Scenic'
  },
  {
    id: 'route-3',
    from: 'Dhaka',
    to: "Cox's Bazar",
    serviceType: 'bus',
    serviceLabel: 'Scania Bus',
    iconName: 'Bus',
    time: '8h 30m',
    frequency: '45+ Daily Coaches',
    startingPrice: 22,
    badge: 'Popular'
  },
  {
    id: 'route-4',
    from: 'Dhaka',
    to: 'Sylhet',
    serviceType: 'train',
    serviceLabel: 'Parabat Express',
    iconName: 'Train',
    time: '6h 40m',
    frequency: '4 Daily Trains',
    startingPrice: 9,
    badge: 'Economical'
  },
  {
    id: 'route-5',
    from: 'Dhaka',
    to: 'Bangkok',
    serviceType: 'flight',
    serviceLabel: 'Intl Flight',
    iconName: 'Plane',
    time: '2h 35m',
    frequency: '5 Daily Flights',
    startingPrice: 245,
    badge: 'Best Value'
  },
  {
    id: 'route-6',
    from: 'Dhaka',
    to: 'Dubai',
    serviceType: 'flight',
    serviceLabel: 'Intl Flight',
    iconName: 'Plane',
    time: '5h 40m',
    frequency: '8 Daily Direct Flights',
    startingPrice: 395,
    badge: 'Direct'
  }
];

export const SPECIAL_OFFERS = [
  {
    id: 'deal-1',
    code: 'EASEFLY15',
    discount: '15% OFF',
    title: 'Fly High with Biman & US-Bangla',
    description: 'Get up to $40 off on domestic & international flights booked this week.',
    category: 'Flights',
    validUntil: 'Nov 30, 2026',
    color: 'from-blue-600 to-indigo-800'
  },
  {
    id: 'deal-2',
    code: 'HOTELESCAPE25',
    discount: '25% OFF',
    title: 'Luxury Resorts & Weekend Getaways',
    description: 'Special weekend voucher at 5-star beachfront resorts and hill villas.',
    category: 'Hotels',
    validUntil: 'Dec 15, 2026',
    color: 'from-teal-600 to-emerald-800'
  },
  {
    id: 'deal-3',
    code: 'TRAINGO10',
    discount: 'Flat 10% OFF',
    title: 'Direct Train Trips to Cox’s Bazar',
    description: 'Zero convenience fees on all AC Snigdha & Berth ticket reservations.',
    category: 'Trains',
    validUntil: 'Nov 28, 2026',
    color: 'from-amber-600 to-orange-800'
  },
  {
    id: 'deal-4',
    code: 'FIRSTJOURNEY',
    discount: '$20 OFF',
    title: 'Welcome First Trip Special',
    description: 'First time using TravelEase? Enjoy $20 instant discount across any service.',
    category: 'All Services',
    validUntil: 'Dec 31, 2026',
    color: 'from-cyan-600 to-blue-800'
  }
];

export const WHY_CHOOSE_US = [
  {
    icon: 'SearchCheck',
    title: 'Unified Travel Engine',
    desc: 'Compare flights, 5-star hotels, express buses, and intercity trains in one seamless interface.'
  },
  {
    icon: 'ShieldCheck',
    title: '100% Secure & Transparent',
    desc: 'No hidden taxes or surprise charges. Transparent fare breakdowns and simulated secure payment flows.'
  },
  {
    icon: 'BadgePercent',
    title: 'Best Price Guarantee',
    desc: 'Exclusive negotiated partner rates, real-time availability updates, and daily member discounts.'
  },
  {
    icon: 'Clock4',
    title: '24/7 Concierge Support',
    desc: 'Dedicated round-the-clock live travel agents ready to assist with reschedules, inquiries, and baggage assistance.'
  }
];

export const INITIAL_USER = {
  name: 'Tanvir Hossain',
  email: 'tanvir@travelease.demo',
  phone: '+880 1712-345678',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  country: 'Bangladesh',
  passportNumber: 'A08942157',
  passportExpiry: '2030-08-15',
  membershipTier: 'Platinum Club',
  loyaltyPoints: 3450,
  savedPassengers: [
    { name: 'Tanvir Hossain', type: 'Adult', gender: 'Male', dob: '1992-05-14', nidOrPassport: 'A08942157' },
    { name: 'Nusrat Jahan', type: 'Adult', gender: 'Female', dob: '1995-10-21', nidOrPassport: 'B12049182' }
  ]
};
