document.addEventListener("DOMContentLoaded", function () {
  // Sayfa Yükleme Animasyonu
  var loader = document.getElementById("page-loader");
  if (loader) {
    loader.addEventListener("animationend", function () {
      loader.classList.add("hide");
      // Sayfa içeriklerini göster
      document.body.classList.add("content-loaded");
    });
  }

  // Sayfa Kapanış Efekti - Sadece Ana Sayfa butonunda
  const anaSayfaLink = document.querySelector('a[href="index.html"]');
  const pageCloseLoader = document.getElementById("page-close-loader");

  if (anaSayfaLink && pageCloseLoader) {
    anaSayfaLink.addEventListener("click", function (e) {
      e.preventDefault(); // Normal link davranışını engelle

      // Sayfa kapanış efektini başlat
      pageCloseLoader.classList.add("active");

      // Efekt bitince ana sayfaya git
      pageCloseLoader.addEventListener(
        "animationend",
        function () {
          window.location.href = "index.html";
        },
        { once: true }
      ); // Event listener'ı sadece bir kez çalıştır
    });
  }

  const container = document.querySelector(".horizontal-scroll-container");
  const sections = document.querySelectorAll(".scroll-section");
  const dots = document.querySelectorAll(".dot");
  const prevArrow = document.querySelector(".prev-arrow");
  const nextArrow = document.querySelector(".next-arrow");

  let currentSection = 0;
  const totalSections = 3;

  // Function to show specific section
  function showSection(sectionIndex) {
    // Hide all sections
    sections.forEach((section, index) => {
      if (index === sectionIndex) {
        section.style.transform = `translateX(0)`;
        section.style.zIndex = "1";
      } else {
        section.style.transform = `translateX(${
          (index - sectionIndex) * 100
        }vw)`;
        section.style.zIndex = "0";
      }
    });

    currentSection = sectionIndex;
    updateDots();
  }

  // Function to update active dot
  function updateDots() {
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSection);
    });
  }

  // Function to go to next section
  function nextSection() {
    if (currentSection < totalSections - 1) {
      showSection(currentSection + 1);
    }
  }

  // Function to go to previous section
  function prevSection() {
    if (currentSection > 0) {
      showSection(currentSection - 1);
    }
  }

  // Event listeners for navigation arrows
  nextArrow.addEventListener("click", nextSection);
  prevArrow.addEventListener("click", prevSection);

  // Event listeners for dots
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSection(index);
    });
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      nextSection();
    } else if (e.key === "ArrowLeft") {
      prevSection();
    }
  });

  // Touch/swipe support for mobile
  let startX = 0;
  let endX = 0;

  container.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  container.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = startX - endX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe left - next section
        nextSection();
      } else {
        // Swipe right - previous section
        prevSection();
      }
    }
  }

  // Auto-scroll indicator animation
  function animateDots() {
    dots.forEach((dot, index) => {
      if (index === currentSection) {
        dot.style.animation = "pulse 2s infinite";
      } else {
        dot.style.animation = "none";
      }
    });
  }

  // Add CSS animation for pulse effect
  const style = document.createElement("style");
  style.textContent = `
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.3); }
      100% { transform: scale(1); }
    }
  `;
  document.head.appendChild(style);

  // Initialize - show first section
  showSection(0);
  updateDots();
  animateDots();

  // Update dots animation on section change
  setInterval(animateDots, 100);
});
