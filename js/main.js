// // Навигация для десктопа

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

/////////////////////////////

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
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  // autoplay: {
  //   delay: 4000,
  //   disableOnInteraction: false, // Не останавливаться после взаимодействия
  // },
  // loop: true, // Бесконечная прокрутка
  // speed: 1500, // Скорость анимации перехода
});
