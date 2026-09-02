import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

export const firebaseConfig = {
  apiKey: "AIzaSyCNyWFAINM_L2k9-sM3wnuWYjlEDVoXjE0",
  authDomain: "acheda-zanzibar-tours.firebaseapp.com",
  projectId: "acheda-zanzibar-tours",
  storageBucket: "acheda-zanzibar-tours.firebasestorage.app",
  messagingSenderId: "178711140763",
  appId: "1:178711140763:web:108863107e2457f8eca93e",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

//total number of images in /images
export const TOTAL_IMAGES = 130;

// -------------------------------------------------
// DEFAULTS - used until the admin saves real choices,
// and as a fallback for any key the admin hasn't touched yet.
// -------------------------------------------------
export const DEFAULT_IMAGES = {
  "day1-6": 1,
  "day2-6": 2,
  "day3-6": 3,
  "day4-6": 4,
  "day5-6": 5,
  "day6-6": 6,
  "airport-arrival-5": 7,
  "day1-5": 8,
  "day2-5": 9,
  "day3-5": 10,
  "airport-departure-5": 11,
  "airport-arrival-4": 12,
  "day1-4": 13,
  "day2-4": 14,
  "airport-departure-4": 15,
  "day1-3": 16,
  "day2-3": 17,
  "day3-3": 18,
  mikumi: 19,
  "safari2d1n-1": 20,
  "safari2d1n-2": 21,
  "safari3d2n-1": 22,
  "safari3d2n-2": 23,
  "safari3d2n-3": 24,
  "transport-1": 25,
  "transport-2": 26,
};

export const DEFAULT_EXTRA_IMAGES = {
  "day1-6": [27, 28],
  "day2-6": [29, 30],
  "day3-6": [31, 32],
  "day4-6": [33, 34],
  "day5-6": [35, 36],
  "day6-6": [37, 38],
  "day1-5": [39, 40],
  "day2-5": [41, 42],
  "day3-5": [1, 2],
  "day1-4": [3, 4],
  "day2-4": [5, 6],
  "day1-3": [7, 8],
  "day2-3": [9, 10],
  "day3-3": [11, 12],
  mikumi: [13, 14],
};

export const DEFAULT_PRICES = {
  "6days-1": 800,
  "6days-2": 480,
  "6days-2-5": 420,
  "6days-5-10": 350,
  "5days-1": 720,
  "5days-2": 550,
  "5days-3-6": 400,
  "4days-1": 520,
  "4days-2": 290,
  "4days-2-5": 250,
  "4days-5-10": 220,
  "3days-1": 490,
  "3days-2": 320,
  "3days-3-6": 250,
  "transport-kendwa": 60,
  "transport-matemwe": 60,
  "transport-pongwe": 60,
  "transport-paje": 60,
  "transport-dongwe": 60,
  "transport-kizimkazi": 60,
  "transport-fumba": 50,
  "transport-stonetown": 20,
  "transport-fullday": 100,
};

// Human-readable labels for the admin panel
export const PACKAGE_LABELS = {
  "day1-6": "6 Days - Day 1: Spice Farm + Prison Island + Stone Town",
  "day2-6": "6 Days - Day 2: Mnemba Island & Sunset Cruise",
  "day3-6": "6 Days - Day 3: Jozani Forest + Salaam Cave + The Rock",
  "day4-6": "6 Days - Day 4: Safari Blue",
  "day5-6": "6 Days - Day 5: Village Visit & Cooking Class",
  "day6-6": "6 Days - Day 6: Starfish at Pingwe + Paje Beach",
  "airport-arrival-5": "5 Days - Day 1: Airport Pickup",
  "day1-5": "5 Days - Day 2: Mnemba, Nungwi & Sunset Cruise",
  "day2-5": "5 Days - Day 3: Spice Farm, Prison Island & Stone Town",
  "day3-5": "5 Days - Day 4: Jozani, Salaam Cave & The Rock",
  "airport-departure-5": "5 Days - Day 5: Departure Transfer",
  "airport-arrival-4": "4 Days - Day 1: Airport Pickup",
  "day1-4": "4 Days - Day 2: Spice Farm, Nakupenda & Night Market",
  "day2-4": "4 Days - Day 3: Mnemba, Sea Turtles & Kendwa",
  "airport-departure-4": "4 Days - Day 4: Departure Transfer",
  "day1-3": "3 Days - Day 1: Jozani, Salaam Cave & The Rock",
  "day2-3": "3 Days - Day 2: Mnemba Island (Dolphins)",
  "day3-3": "3 Days - Day 3: Spice Farm, Prison Island & Stone Town",
  mikumi: "Mikumi Day Trip Safari",
  "safari2d1n-1": "2 Days 1 Night Safari - Day 1",
  "safari2d1n-2": "2 Days 1 Night Safari - Day 2",
  "safari3d2n-1": "3 Days 2 Nights Safari - Day 1",
  "safari3d2n-2": "3 Days 2 Nights Safari - Day 2",
  "safari3d2n-3": "3 Days 2 Nights Safari - Day 3",
  "transport-1": "Airport Transfers - service photo 1",
  "transport-2": "Airport Transfers - service photo 2",
};

// Only these keys have an "extra images" modal gallery
export const EXTRA_IMAGE_KEYS = Object.keys(DEFAULT_EXTRA_IMAGES);

export const PRICE_LABELS = {
  "6days-1": "6 Days - 1 person",
  "6days-2": "6 Days - 2 people",
  "6days-2-5": "6 Days - 2-5 people",
  "6days-5-10": "6 Days - 5-10 people",
  "5days-1": "5 Days - 1 person",
  "5days-2": "5 Days - 2 people",
  "5days-3-6": "5 Days - 3-6 people",
  "4days-1": "4 Days - 1 person",
  "4days-2": "4 Days - 2 people",
  "4days-2-5": "4 Days - 2-5 people",
  "4days-5-10": "4 Days - 5-10 people",
  "3days-1": "3 Days - 1 person",
  "3days-2": "3 Days - 2 people",
  "3days-3-6": "3 Days - 3-6 people",
  "transport-kendwa": "Transfer - Kendwa/Nungwi",
  "transport-matemwe": "Transfer - Matemwe/Kiwengwa/Pwani Mchangani",
  "transport-pongwe": "Transfer - Pongwe/Uroa/Chwaka",
  "transport-paje": "Transfer - Paje/Bwejuu/Jambiani",
  "transport-dongwe": "Transfer - Dongwe/Michamvi/Pingwe",
  "transport-kizimkazi": "Transfer - Kizimkazi/Makunduchi",
  "transport-fumba": "Transfer - Fumba",
  "transport-stonetown": "Transfer - Stone Town",
  "transport-fullday": "Full Day Transfer",
};

const CONFIG_DOC_PATH = ["config", "site"];

// -------------------------------------------------
// Load the live config from Firestore and merge it
// over the defaults (missing keys fall back to default).
// -------------------------------------------------
export async function loadMergedConfig() {
  const merged = {
    images: { ...DEFAULT_IMAGES },
    extraImages: Object.fromEntries(
      Object.entries(DEFAULT_EXTRA_IMAGES).map(([k, v]) => [k, [...v]]),
    ),
    prices: { ...DEFAULT_PRICES },
  };

  try {
    const snap = await getDoc(doc(db, ...CONFIG_DOC_PATH));
    if (snap.exists()) {
      const data = snap.data();
      if (data.images) Object.assign(merged.images, data.images);
      if (data.extraImages) Object.assign(merged.extraImages, data.extraImages);
      if (data.prices) Object.assign(merged.prices, data.prices);
    }
  } catch (err) {
    console.warn("Could not load live site config, using defaults:", err);
  }

  return merged;
}

// -------------------------------------------------
// Save the full config back to Firestore (admin only -
// Firestore security rules must restrict this to the admin account).
// -------------------------------------------------
export async function saveConfig(config) {
  await setDoc(doc(db, ...CONFIG_DOC_PATH), config, { merge: false });
}
