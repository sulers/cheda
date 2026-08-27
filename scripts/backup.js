// ============================================
// BACKUP DATA – only used if Firebase fails
// ============================================
export const BACKUP_GROUPS = [
  {
    id: "backup-6day",
    title: "6 Days Island Tour",
    subtitle:
      "Experience the very best of Zanzibar over six unforgettable days",
    category: "Packages",
    displayOrder: 1,
    pricing: [
      { label: "1 person", amount: "$800", note: "per person" },
      { label: "2 people", amount: "$480", note: "per person" },
      { label: "2–5 people", amount: "$420", note: "per person" },
      { label: "5–10 people", amount: "$350", note: "per person" },
    ],
    days: [
      {
        id: "backup-day1-6",
        dayOrder: 1,
        title: "Spice Farm + Prison Island + Stone Town",
        shortDescription:
          "Discover Zanzibar's famous spices, meet giant tortoises, and wander the historic streets of Stone Town.",
        tag: "Most Popular",
        imageUrl: "./images/40.jpeg",
        duration: "full day",
        pickupTime: "9:00 AM",
        fullDescription: `<p>Your journey begins with a 9:00 AM hotel pickup. First, visit a traditional Spice Farm, where you'll discover Zanzibar's famous spices, tropical fruits, and medicinal plants while enjoying fresh fruit tasting. Next, head to Prison Island by boat to meet the giant Aldabra tortoises and learn about the island's fascinating history. Afterward, continue with a Stone Town Walking Tour, exploring the Old Slave Market, Darajani Market, Old Fort, House of Wonders, Freddie Mercury House, Forodhani Gardens, and the charming narrow streets filled with local culture and history. After an unforgettable day exploring the best of Zanzibar, you'll be transferred back to your hotel.</p>`,
        extraImages: [
          "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=400&h=300&fit=crop",
          "https://images.unsplash.com/photo-1590549413563-9e9e700d7cb9?w=400&h=300&fit=crop",
        ],
      },
      {
        id: "backup-day2-6",
        dayOrder: 2,
        title: "Mnemba Island & Sunset Cruise at Kendwa Beach",
        shortDescription:
          "Snorkel crystal-clear waters, swim with dolphins, and enjoy a magical sunset cruise at Kendwa Beach.",
        tag: "Best for Couples",
        imageUrl: "./images/98.jpeg",
        duration: "full day",
        pickupTime: "9:00 AM",
        fullDescription: `<p>Your day begins with a 9:00 AM hotel pickup and a transfer to the departure point for your Mnemba Island excursion. Enjoy snorkeling in the crystal-clear waters, discover colorful coral reefs and tropical fish, relax on the beautiful sandbank (weather permitting), and keep an eye out for dolphins in their natural habitat. After your ocean adventure, you'll have time to relax before heading to Kendwa Beach for a magical Sunset Cruise. Sail along Zanzibar's stunning coastline, take in breathtaking sunset views, enjoy the refreshing sea breeze, and create unforgettable memories as the sun sets over the Indian Ocean. After the cruise, you'll be transferred back to your hotel.</p>`,
        extraImages: [
          "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop",
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop",
        ],
      },
      {
        id: "backup-day3-6",
        dayOrder: 3,
        title: "Jozani Forest + Salaam Cave + Mtende Beach + The Rock",
        shortDescription:
          "Spot rare red colobus monkeys, swim in natural cave pools, and dine at Zanzibar's iconic Rock Restaurant.",
        tag: "Adventure",
        imageUrl: "./images/90.jpeg",
        duration: "full day",
        pickupTime: "9:00 AM",
        fullDescription: `<p>Your tour begins with a 9:00 AM hotel pickup and a drive to Jozani Forest, home to the rare Zanzibar Red Colobus Monkeys and a beautiful mangrove boardwalk. Next, visit Salaam Cave, where you can swim in crystal-clear natural water, feed sea turtles, and enjoy the peaceful surroundings. Continue to the stunning Mtende Beach, known for its white sand, turquoise water, and breathtaking coastal scenery. End your journey at the famous The Rock Restaurant, one of Zanzibar's most iconic dining spots, where you can admire spectacular ocean views and enjoy a delicious meal or refreshing drink (meal not included). After an unforgettable day exploring Zanzibar's nature and coastline, you'll be transferred back to your hotel.</p>`,
        extraImages: [
          "https://images.unsplash.com/photo-1542406775-5c7fea9b9d3b?w=400&h=300&fit=crop",
          "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=400&h=300&fit=crop",
        ],
      },
      {
        id: "backup-day4-6",
        dayOrder: 4,
        title: "Safari Blue",
        shortDescription:
          "Sail on a traditional dhow, snorkel vibrant reefs, and enjoy a seafood barbecue on a pristine sandbank.",
        tag: "Best Value",
        imageUrl: "./images/84.jpeg",
        duration: "full day",
        pickupTime: "8:00 AM",
        fullDescription: `<p>Your adventure starts with a 8:00 AM hotel pickup and a transfer to Fumba, where you'll board a traditional wooden dhow for the famous Safari Blue excursion. Cruise across the crystal-clear waters of the Indian Ocean, snorkel among vibrant coral reefs, relax on a pristine sandbank, and swim in a natural lagoon surrounded by mangrove trees. Enjoy a freshly prepared seafood barbecue with tropical fruits and refreshing drinks while taking in the beauty of Zanzibar's coastline. This full-day experience offers the perfect combination of sailing, swimming, snorkeling, and relaxation before returning to your hotel with unforgettable memories.</p>`,
        extraImages: [
          "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop",
          "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop",
        ],
      },
      {
        id: "backup-day5-6",
        dayOrder: 5,
        title: "Village Visit & Cooking Class",
        shortDescription:
          "Immerse yourself in local culture, visit a traditional village, and learn to cook authentic Zanzibari dishes.",
        tag: "Cultural",
        imageUrl: "./images/101.jpeg",
        duration: "full day",
        pickupTime: "9:00 AM",
        fullDescription: `<p>Your experience begins with a 9:00 AM hotel pickup and a warm welcome to a local village. Discover Zanzibar's rich culture as you explore traditional homes, meet friendly locals, and learn about their daily way of life. Then, join a hands-on cooking class where you'll prepare authentic Zanzibari dishes using fresh local ingredients and aromatic spices. After enjoying the delicious meal you've helped create, you'll have time to interact with the community and experience the true taste and traditions of Zanzibar before returning to your hotel.</p>`,
        extraImages: [
          "https://images.unsplash.com/photo-1558980664-3a031cf67ea9?w=400&h=300&fit=crop",
          "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=400&h=300&fit=crop",
        ],
      },
      {
        id: "backup-day6-6",
        dayOrder: 6,
        title: "Starfish at Pingwe + Paje Beach",
        shortDescription:
          "See beautiful starfish in their natural habitat and relax on the stunning white sands of Paje Beach.",
        tag: "Relaxation",
        imageUrl: "./images/42.jpeg",
        duration: "full day",
        pickupTime: "9:00 AM",
        fullDescription: `<p>Your day starts with a 9:00 AM hotel pickup and a scenic drive to Pingwe, where you'll have the chance to see beautiful starfish in their natural shallow-water habitat during low tide. Enjoy the peaceful surroundings, take memorable photos, and learn about the local marine ecosystem while respecting the wildlife. Continue to Paje Beach, one of Zanzibar's most stunning beaches, famous for its white sand, turquoise waters, and laid-back atmosphere. Relax on the beach, swim in the warm Indian Ocean, or simply enjoy the breathtaking coastal views before returning to your hotel.</p>`,
        extraImages: [
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop",
          "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=400&h=300&fit=crop",
        ],
      },
    ],
  },
  {
    id: "backup-3day",
    title: "3 Days Island Tour",
    subtitle: "A shorter escape packed with Zanzibar's most iconic experiences",
    category: "Packages",
    displayOrder: 3,
    pricing: [
      { label: "1 person", amount: "$490", note: "per person" },
      { label: "2 people", amount: "$320", note: "per person" },
      { label: "3–6 people", amount: "$250", note: "per person" },
    ],
    days: [
      {
        id: "backup-day1-3",
        dayOrder: 1,
        title: "Jozani Forest + Salaam Cave + The Rock",
        shortDescription:
          "Explore the lush Jozani Forest, swim in Salaam Cave, and dine at the iconic Rock Restaurant.",
        tag: "Adventure",
        imageUrl: "./images/93.jpeg",
        duration: "full day",
        pickupTime: "9:00 AM",
        fullDescription: `<p>Start your Zanzibar journey by exploring the beautiful Jozani Forest, home to the rare Zanzibar Red Colobus Monkeys and a peaceful mangrove boardwalk. Continue to the stunning Salaam Cave, where you can swim in crystal-clear natural water, relax in a peaceful setting, and even feed friendly turtles. End the day at the iconic The Rock Restaurant, one of Zanzibar's most famous landmarks, where you can enjoy breathtaking ocean views and capture unforgettable photos while tasting delicious seafood (meal optional).</p>`,
        extraImages: [
          "https://images.unsplash.com/photo-1542406775-5c7fea9b9d3b?w=400&h=300&fit=crop",
          "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=400&h=300&fit=crop",
        ],
      },
      {
        id: "backup-day2-3",
        dayOrder: 2,
        title: "Mnemba Island – Swimming with Dolphins",
        shortDescription:
          "Swim alongside wild dolphins, snorkel vibrant coral reefs, and relax on Mnemba's pristine sandbank.",
        tag: "Best for Couples",
        imageUrl: "./images/127.jpeg",
        duration: "full day",
        pickupTime: "8:30 AM",
        fullDescription: `<p>Enjoy an unforgettable ocean experience at Mnemba Island, one of Zanzibar's top snorkeling destinations. Start the day with the chance to see and swim alongside wild dolphins in their natural habitat. Continue with snorkeling in the crystal-clear turquoise waters, where you'll discover colorful coral reefs and tropical fish. Relax on the beautiful sandbank (tide permitting), swim in the warm Indian Ocean, and enjoy fresh tropical fruits before returning to your hotel.</p>`,
        extraImages: [
          "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop",
          "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop",
        ],
      },
      {
        id: "backup-day3-3",
        dayOrder: 3,
        title: "Spice Farm + Prison Island + Stone Town",
        shortDescription:
          "Experience the Spice Island, visit Prison Island's tortoises, and explore historic Stone Town.",
        tag: "Most Popular",
        imageUrl: "./images/122.jpeg",
        duration: "full day",
        pickupTime: "9:00 AM",
        fullDescription: `<p>Experience the rich culture and history of Zanzibar on this full-day tour. Begin at the Spice Farm, where you'll discover why Zanzibar is known as the "Spice Island" by seeing, smelling, and tasting fresh tropical spices and fruits. Next, take a boat trip to Prison Island to meet the famous giant Aldabra tortoises and learn about the island's fascinating history. End your journey with a guided Stone Town Walking Tour, exploring narrow streets, historic buildings, local markets, and the vibrant culture of Zanzibar's UNESCO World Heritage Site.</p>`,
        extraImages: [
          "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=400&h=300&fit=crop",
          "https://images.unsplash.com/photo-1590549413563-9e9e700d7cb9?w=400&h=300&fit=crop",
        ],
      },
    ],
  },
  {
    id: "backup-mikumi",
    title: "Mikumi Day Trip Safari",
    subtitle: "A fly-in safari day trip from Zanzibar to Mikumi National Park",
    category: "Safari",
    displayOrder: 4,
    pricing: [{ label: "Contact us", amount: "for current pricing", note: "" }],
    days: [
      {
        id: "backup-mikumi-day",
        dayOrder: 1,
        title: "Mikumi National Park Safari",
        shortDescription:
          "Fly round-trip from Zanzibar to Mikumi for a full day of game drives in an open jeep, with lunch and soft drinks included.",
        tag: "Safari Special",
        imageUrl: "./images/45.jpeg",
        duration: "full day",
        pickupTime: "06:30 or 07:00",
        fullDescription: `<p>Fly from Zanzibar direct to Mikumi, where you'll meet your safari guide at the park for a short briefing before setting off. The morning safari begins at 07:20, followed by a lunch break at 12:30 and an afternoon safari at 13:30. The return flight to Zanzibar departs at 15:00, arriving back around 15:45.</p>
                        <ul>
                            <li><i class="fas fa-check-circle"></i> Flight round trip</li>
                            <li><i class="fas fa-check-circle"></i> Entrance fees</li>
                            <li><i class="fas fa-check-circle"></i> Open jeep</li>
                            <li><i class="fas fa-check-circle"></i> Lunch and soft drinks</li>
                        </ul>`,
        extraImages: [
          "https://images.unsplash.com/photo-1549366021-9f761d450615?w=400&h=300&fit=crop",
          "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=400&h=300&fit=crop",
        ],
      },
    ],
  },
];
