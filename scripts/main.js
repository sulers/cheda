// ------------------------------------------------
// 1. IMPORT FIREBASE SDK
// ------------------------------------------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
  where,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ------------------------------------------------
// 2. YOUR FIREBASE CONFIG (REPLACE WITH YOUR OWN)
// ------------------------------------------------
const firebaseConfig = {
  apiKey: "AIzaSyCNyWFAINM_L2k9-sM3wnuWYjlEDVoXjE0",
  authDomain: "acheda-zanzibar-tours.firebaseapp.com",
  projectId: "acheda-zanzibar-tours",
  storageBucket: "acheda-zanzibar-tours.firebasestorage.app",
  messagingSenderId: "178711140763",
  appId: "1:178711140763:web:108863107e2457f8eca93e",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ------------------------------------------------
// 3. CACHE & HELPERS
// ------------------------------------------------
const packageCache = {}; // key: packageDay docId, value: full data
const whatsappNumber = "255615311661";

const BACKUP_GROUPS = [
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

// ============================================
// RENDER – tries Firebase, falls back to backup
// ============================================
async function renderAllGroups() {
  const container = document.getElementById("dynamicPackageSections");
  container.innerHTML =
    '<div style="text-align:center;padding:40px;"><i class="fas fa-spinner fa-spin fa-2x"></i><p>Loading tours...</p></div>';

  let groups = [];
  let usedBackup = false;

  try {
    // Try Firebase first
    const groupsQuery = query(
      collection(db, "tourGroups"),
      orderBy("displayOrder", "asc"),
    );
    const groupsSnap = await getDocs(groupsQuery);

    if (!groupsSnap.empty) {
      // Build groups array from Firebase
      for (const groupDoc of groupsSnap.docs) {
        const group = groupDoc.data();
        const groupId = groupDoc.id;

        const daysQuery = query(
          collection(db, "packageDays"),
          where("groupId", "==", groupId),
          orderBy("dayOrder", "asc"),
        );
        const daysSnap = await getDocs(daysQuery);

        const days = [];
        daysSnap.forEach((doc) => {
          const data = doc.data();
          packageCache[doc.id] = data;
          days.push({ id: doc.id, ...data });
        });

        groups.push({ id: groupId, ...group, days });
      }
    } else {
      // Firebase returned empty – use backup
      usedBackup = true;
      groups = BACKUP_GROUPS.map((g) => ({ ...g }));
      // Cache backup days
      groups.forEach((g) => {
        g.days.forEach((day) => {
          packageCache[day.id] = day;
        });
      });
    }
  } catch (error) {
    // Firebase failed – use backup
    console.warn("Firebase error, using backup data:", error);
    usedBackup = true;
    groups = BACKUP_GROUPS.map((g) => ({ ...g }));
    groups.forEach((g) => {
      g.days.forEach((day) => {
        packageCache[day.id] = day;
      });
    });
  }

  // If still no groups, show empty state
  if (!groups || groups.length === 0) {
    container.innerHTML = `
            <div style="text-align:center;padding:40px;background:var(--white);border-radius:var(--radius);">
                <i class="fas fa-umbrella-beach fa-3x" style="color:var(--orange);"></i>
                <p style="margin-top:16px;font-size:1.2rem;">No tours available yet. Please check back soon!</p>
            </div>
        `;
    return;
  }

  // Show a small notice if using backup
  let backupNotice = "";
  if (usedBackup) {
    backupNotice = `
            <div style="background:var(--orange-glow);border:1px solid var(--orange);border-radius:var(--radius-sm);padding:12px 20px;margin-bottom:24px;text-align:center;color:var(--blue-deep);font-size:0.9rem;">
                <i class="fas fa-info-circle" style="color:var(--orange);"></i> 
                Using backup content – live data is currently unavailable.
            </div>
        `;
  }

  // Build the HTML
  let html = backupNotice;

  groups.forEach((group) => {
    html += `
            <section class="section-spacing-sm" style="padding-top:0;">
                <div class="section-label"><i class="fas fa-umbrella-beach"></i> ${group.category || "Packages"}</div>
                <h2 class="section-title">${group.title || "Tour"}</h2>
                ${group.subtitle ? `<p class="section-subtitle">${group.subtitle}</p>` : ""}
        `;

    if (group.days && group.days.length > 0) {
      html += `<div class="packages-grid">`;
      group.days.forEach((day) => {
        const tagClass = day.tag
          ? day.tag.toLowerCase().replace(/\s/g, "")
          : "";
        html += `
                    <div class="package-card" data-package="${day.id}">
                        <div class="package-image">
                            <img src="${day.imageUrl || "https://via.placeholder.com/400x200?text=No+Image"}" alt="${day.title || "Package"}" loading="lazy" />
                            ${day.dayOrder ? `<span class="package-day">${day.dayOrder === 1 ? "Day 1" : "Day " + day.dayOrder}</span>` : ""}
                            ${day.tag ? `<span class="package-tag ${tagClass}">${day.tag}</span>` : ""}
                        </div>
                        <div class="package-body">
                            <h3 class="package-title">${day.title || "Untitled"}</h3>
                            <p class="package-desc">${day.shortDescription || ""}</p>
                            <button class="btn btn-outline package-more" data-package="${day.id}">More Info <i class="fas fa-arrow-right"></i></button>
                        </div>
                    </div>
                `;
      });
      html += `</div>`;
    }

    if (
      group.pricing &&
      Array.isArray(group.pricing) &&
      group.pricing.length > 0
    ) {
      html += `
                <div class="pricing-table">
                    <h4><i class="fas fa-tag"></i> ${group.title || "Tour"} – Pricing</h4>
                    <div class="pricing-grid">
            `;
      group.pricing.forEach((item) => {
        html += `
                    <div class="pricing-item">
                        <span class="pricing-label">${item.label || ""}</span>
                        <span class="pricing-amount">${item.amount || ""}</span>
                        ${item.note ? `<span class="pricing-note">${item.note}</span>` : ""}
                    </div>
                `;
      });
      html += `
                    </div>
                </div>
            `;
    }

    html += `</section>`;
  });

  container.innerHTML = html;

  // Attach modal event listeners
  document.querySelectorAll(".package-more").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const dayId = btn.getAttribute("data-package");
      openModal(dayId);
    });
  });
}

// ------------------------------------------------
// 5. MODAL LOGIC
// ------------------------------------------------
function openModal(dayId) {
  const data = packageCache[dayId];
  if (!data) {
    alert("Package details not found.");
    return;
  }

  const modal = document.getElementById("packageModal");
  const body = document.getElementById("packageModalBody");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hi%20Acheda%20Zanzibar%20Tours%2C%20I'm%20interested%20in%20the%20package%3A%20${encodeURIComponent(data.title || "Tour")}`;

  let extraImagesHtml = "";
  if (data.extraImages && data.extraImages.length > 0) {
    extraImagesHtml = `
                <div class="modal-extra-images">
                    <h4><i class="fas fa-images"></i> More from this experience</h4>
                    <div class="extra-images-scroll">
                        ${data.extraImages.map((img) => `<img src="${img}" alt="Extra view" loading="lazy" />`).join("")}
                    </div>
                </div>
            `;
  }

  body.innerHTML = `
            <h2>${data.title || "Package"}</h2>
            <div class="package-meta"><i class="far fa-clock"></i> ${data.duration || "Full day"} ${data.pickupTime ? "| Pick-up: " + data.pickupTime : ""}</div>
            <div class="package-full-desc">${data.fullDescription || "<p>No detailed description available.</p>"}</div>
            <div class="package-inclusive-note">
                <i class="fas fa-gem"></i> <strong>One-time payment covers everything:</strong> transport, meals, entry fees, and expert guide – no hidden costs!
            </div>
            ${extraImagesHtml}
            <a href="${whatsappLink}" target="_blank" class="modal-whatsapp-btn">
                <i class="fab fa-whatsapp"></i> Book Now via WhatsApp
            </a>
        `;

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

// Modal close events
document.getElementById("packageModalClose").addEventListener("click", () => {
  document.getElementById("packageModal").classList.remove("active");
  document.body.style.overflow = "";
});
document
  .querySelector("#packageModal .modal-overlay")
  .addEventListener("click", () => {
    document.getElementById("packageModal").classList.remove("active");
    document.body.style.overflow = "";
  });

// ------------------------------------------------
// 6. INITIALIZE
// ------------------------------------------------
renderAllGroups();

// ------------------------------------------------
// 7. EXISTING STATIC SCRIPTS (nav, carousel, form, translate)
//    These are left as they were – only the packageData object was removed.
// ------------------------------------------------
// We re-attach the nav, carousel, form, translate logic here.
// (The original script block at the bottom of the static file is replaced by this module,
//  so we replicate the essential non-package functionality.)

// NAVBAR SCROLL
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 60);
});

// MOBILE MENU
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
navToggle.addEventListener("click", () => navMenu.classList.toggle("open"));
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => navMenu.classList.remove("open"));
});

// TESTIMONIALS CAROUSEL
const track = document.getElementById("testimonialsTrack");
const slides = track.querySelectorAll(".testimonial-slide");
const prevBtn = document.getElementById("carouselPrev");
const nextBtn = document.getElementById("carouselNext");
let currentIndex = 0;
const totalSlides = slides.length;

function updateCarousel() {
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
}
prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  updateCarousel();
});
nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % totalSlides;
  updateCarousel();
});
let autoPlay = setInterval(() => nextBtn.click(), 5000);
const carouselContainer = document.querySelector(".testimonials-carousel");
carouselContainer.addEventListener("mouseenter", () => clearInterval(autoPlay));
carouselContainer.addEventListener("mouseleave", () => {
  autoPlay = setInterval(() => nextBtn.click(), 5000);
});

// CONTACT FORM
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Thank you for your message! We will get back to you soon.");
  e.target.reset();
});

// GOOGLE TRANSLATE (copied from static version)
const gtBarWrapper = document.getElementById("gtBarWrapper");
const gtLangLabel = document.getElementById("gtLangLabel");
const gtCloseBtn = document.getElementById("gtCloseBtn");
const translateBtn = document.getElementById("translateBtn");
const translateDropdown = document.getElementById("translateDropdown");
const langButtons = translateDropdown.querySelectorAll("button");
const langNames = { en: "English", fr: "Français", de: "Deutsch" };
let currentLang = "en";

function showTranslateBar(lang) {
  gtLangLabel.textContent = langNames[lang] || "English";
  gtBarWrapper.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function hideTranslateBar() {
  gtBarWrapper.classList.remove("active");
  switchLanguage("en");
}

function switchLanguage(lang) {
  let cookieValue = "";
  if (lang !== "en") {
    cookieValue = "/en/" + lang;
  }
  document.cookie = "googtrans=" + cookieValue + "; path=/";
  document.cookie =
    "googtrans=" + cookieValue + "; path=/; domain=" + window.location.hostname;
  window.location.reload();
}

function checkTranslationStatus() {
  const cookies = document.cookie.split(";");
  let foundLang = "en";
  cookies.forEach((c) => {
    if (c.trim().startsWith("googtrans=")) {
      const val = c.split("=")[1];
      if (val && val.startsWith("/en/")) {
        const parts = val.split("/");
        if (parts.length >= 3) foundLang = parts[2];
      } else if (val === "") foundLang = "en";
    }
  });
  langButtons.forEach((b) => {
    b.classList.toggle(
      "active-lang",
      b.getAttribute("data-lang") === foundLang,
    );
  });
  if (foundLang !== "en") {
    currentLang = foundLang;
    showTranslateBar(foundLang);
  } else {
    gtBarWrapper.classList.remove("active");
  }
}

translateBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  translateDropdown.classList.toggle("open");
});
document.addEventListener("click", (e) => {
  if (
    !e.target.closest("#translateBtn") &&
    !e.target.closest(".translate-dropdown")
  ) {
    translateDropdown.classList.remove("open");
  }
});
langButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const lang = btn.getAttribute("data-lang");
    langButtons.forEach((b) => b.classList.remove("active-lang"));
    btn.classList.add("active-lang");
    translateDropdown.classList.remove("open");
    if (lang === "en") {
      document.cookie =
        "googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      document.cookie =
        "googtrans=; path=/; domain=" +
        window.location.hostname +
        "; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      window.location.reload();
      return;
    }
    switchLanguage(lang);
  });
});
gtCloseBtn.addEventListener("click", () => {
  document.cookie = "googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie =
    "googtrans=; path=/; domain=" +
    window.location.hostname +
    "; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  window.location.reload();
});

window.googleTranslateElementInit = function () {
  new google.translate.TranslateElement(
    {
      pageLanguage: "en",
      includedLanguages: "en,fr,de",
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
      autoDisplay: false,
    },
    "google_translate_element",
  );
  setTimeout(checkTranslationStatus, 500);
};
window.addEventListener("load", () => {
  setTimeout(checkTranslationStatus, 1000);
});
