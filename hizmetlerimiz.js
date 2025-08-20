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

      // Efekt üste değdiği anda ana sayfaya git (animasyonun ortasında)
      setTimeout(function () {
        window.location.href = "index.html";
      }, 1250); // 2.5 saniye / 2 = 1.25 saniye (ortada)
    });
  }

  // Smooth Scroll for internal links
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  internalLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Mobile menu toggle
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileNav = document.querySelector(".mobile-nav");
  const closeMenu = document.querySelector(".close-menu");

  if (mobileMenu) {
    mobileMenu.addEventListener("click", function () {
      mobileNav.classList.add("active");
      mobileMenu.classList.add("active");
    });
  }

  if (closeMenu) {
    closeMenu.addEventListener("click", function () {
      mobileNav.classList.remove("active");
      mobileMenu.classList.remove("active");
    });
  }

  // Close mobile menu when clicking on a link
  const mobileLinks = document.querySelectorAll(".mobile-nav a");
  mobileLinks.forEach((link) => {
    link.addEventListener("click", function () {
      mobileNav.classList.remove("active");
      mobileMenu.classList.remove("active");
    });
  });

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    ".primary-service, .secondary-service, .contact-cta"
  );
  animateElements.forEach((el) => {
    observer.observe(el);
  });

  // Add CSS for animations
  const style = document.createElement("style");
  style.textContent = `
    .primary-service, .secondary-service, .contact-cta {
      opacity: 0;
      transform: translateY(30px);
      transition: all 0.8s ease;
    }
    
    .animate-in {
      opacity: 1;
      transform: translateY(0);
    }
    
    .hero-content {
      opacity: 0;
      transform: translateX(-30px);
      animation: slideInLeft 1s ease 0.5s forwards;
    }
    
    .hero-image {
      opacity: 0;
      transform: translateX(30px);
      animation: slideInRight 1s ease 0.8s forwards;
    }
    
    @keyframes slideInLeft {
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes slideInRight {
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
  `;
  document.head.appendChild(style);
});
