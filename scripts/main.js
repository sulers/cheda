import { BACKUP_GROUPS } from "./backup";

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
  apiKey: "AIzaSyD-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ------------------------------------------------
// 3. CACHE & HELPERS
// ------------------------------------------------
const packageCache = {}; // key: packageDay docId, value: full data
const whatsappNumber = "255615311661";

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
