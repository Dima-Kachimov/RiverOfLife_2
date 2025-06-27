// HEADER
document.querySelectorAll(".nav-item.has-dropdown").forEach((item) => {
  let isCalculated = false; // Флаг для отслеживания расчета позиции

  item.addEventListener("mouseenter", () => {
    const dropdown = item.querySelector(".dropdown");
    if (!dropdown) return;

    // Показываем меню для расчета
    dropdown.style.display = "block";

    // Рассчитываем позицию только при первом наведении
    if (!isCalculated) {
      const rect = dropdown.getBoundingClientRect();
      const screenWidth = window.innerWidth;
      const viewportPadding = 20;

      if (rect.right > screenWidth - viewportPadding) {
        item.classList.add("open-left");
      } else {
        item.classList.remove("open-left");
      }
      isCalculated = true;
    }

    // Для надежности проверяем позицию при каждом наведении
    setTimeout(() => {
      const currentRect = dropdown.getBoundingClientRect();
      if (currentRect.right > window.innerWidth - 20) {
        item.classList.add("open-left");
      }
    }, 10);
  });

  item.addEventListener("mouseleave", () => {
    const dropdown = item.querySelector(".dropdown");
    if (dropdown) dropdown.style.display = "";
  });
});

// Открытие/закрытие мобильного меню
const burger = document.querySelector(".burger");
const mobileMenu = document.querySelector(".mobile-menu");
const closeBtn = document.querySelector(".mobile-menu .close");
const overlay = document.querySelector(".mobile-overlay");

burger.addEventListener("click", () => {
  mobileMenu.classList.add("active");
  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
});

closeBtn.addEventListener("click", () => {
  mobileMenu.classList.remove("active");
  overlay.classList.remove("active");
  document.body.style.overflow = "";
});

overlay.addEventListener("click", () => {
  mobileMenu.classList.remove("active");
  overlay.classList.remove("active");
  document.body.style.overflow = "";
});

// Закрытие меню при клике на ссылку
document.querySelectorAll(".mobile-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  });
});

function setupAccordion() {
  document.querySelectorAll(".accordion-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = button.nextElementSibling;

      // Для вложенных аккордеонов отключаем глобальное закрытие
      const isSubItem = button.closest(".accordion-subitem");

      if (!isSubItem) {
        // Закрываем остальные
        document.querySelectorAll(".accordion-btn").forEach((btn) => {
          if (btn !== button && !btn.closest(".accordion-subitem")) {
            btn.classList.remove("active");
            const p = btn.nextElementSibling;
            if (p && p.classList.contains("accordion-panel")) {
              p.classList.remove("open");
            }
          }
        });
      }

      button.classList.toggle("active");
      if (panel && panel.classList.contains("accordion-panel")) {
        panel.classList.toggle("open");
      }
    });
  });
}

setupAccordion();

// SWIPER
var swiper = new Swiper(".mySwiper", {
  effect: "fade",
  fadeEffect: {
    crossFade: true, // плавное исчезновение текущего слайда и появление следующего
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  loop: true,
  speed: 1500,
});

// STATUS SECTION
function animateStats() {
  const stats = document.querySelectorAll(".stat-number");
  stats.forEach((stat) => {
    const updateCount = () => {
      const target = +stat.getAttribute("data-target");
      const count = +stat.innerText;
      const increment = Math.ceil(target / 200);

      if (count < target) {
        stat.innerText = count + increment;
        setTimeout(updateCount, 20);
      } else {
        stat.innerText = target;
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          updateCount();
          observer.disconnect();
        }
      },
      { threshold: 0.6 }
    );

    observer.observe(stat);
  });
}

document.addEventListener("DOMContentLoaded", animateStats);

// TEAM SECTION
document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".team-section");
  const bg = section.dataset.bg;
  section.style.backgroundImage = `url('${bg}')`;
  section.style.backgroundRepeat = "no-repeat";

  // Универсальный парсер формата "320-center center, 768-center top"
  function parseBreakpointMap(dataAttr) {
    const map = [];
    if (!dataAttr) return map;

    dataAttr.split(",").forEach((item) => {
      const [bp, ...valParts] = item.trim().split("-");
      const val = valParts.join("-"); // сохраняем значения с дефисами
      if (!isNaN(bp) && val !== undefined) {
        map.push({ minWidth: parseInt(bp), value: val });
      }
    });

    map.sort((a, b) => a.minWidth - b.minWidth);
    return map;
  }

  function getResponsiveValue(map, screenWidth, fallback) {
    let result = fallback;
    for (const { minWidth, value } of map) {
      if (screenWidth >= minWidth) {
        result = value;
      }
    }
    return result;
  }

  const heightMap = parseBreakpointMap(section.dataset.height);
  const zoomMap = parseBreakpointMap(section.dataset.zoom);
  const positionMap = parseBreakpointMap(section.dataset.position);

  function updateBackground() {
    const width = window.innerWidth;

    const heightVal = getResponsiveValue(heightMap, width, "500px");
    const zoomVal = parseFloat(getResponsiveValue(zoomMap, width, "1"));
    const positionVal = getResponsiveValue(positionMap, width, "center center");

    section.style.backgroundSize = `${zoomVal * 100}% auto`;
    section.style.backgroundPosition = positionVal;

    if (heightVal === "0") {
      const img = new Image();
      img.src = bg;
      img.onload = () => {
        const aspectRatio = img.naturalHeight / img.naturalWidth;
        const blockWidth = section.offsetWidth;
        const scaledHeight = blockWidth * zoomVal * aspectRatio;
        section.style.height = scaledHeight + "px";
      };
    } else {
      section.style.height = heightVal === "auto" ? "auto" : heightVal;
    }
  }

  updateBackground();
  window.addEventListener("resize", updateBackground);
});
