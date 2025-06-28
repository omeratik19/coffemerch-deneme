// Mobile Menu Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const headerHeight = document.querySelector(".header").offsetHeight;
      const targetPosition = target.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Header background change on scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  const topBar = document.querySelector(".top-bar");

  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.95)";
    header.style.backdropFilter = "blur(10px)";
    header.style.boxShadow = "0 2px 20px rgba(0,0,0,0.1)";
  } else {
    header.style.background = "#fff";
    header.style.backdropFilter = "none";
    header.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
  }

  // Hide top bar on scroll down, show on scroll up
  if (window.scrollY > 50) {
    topBar.style.transform = "translateY(-100%)";
  } else {
    topBar.style.transform = "translateY(0)";
  }
});

// Animate elements on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";

      // Add staggered animation for child elements
      const children = entry.target.querySelectorAll(
        ".product-card, .news-card, .recipe-card"
      );
      children.forEach((child, index) => {
        setTimeout(() => {
          child.style.opacity = "1";
          child.style.transform = "translateY(0)";
        }, index * 100);
      });
    }
  });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll("section").forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(30px)";
  section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(section);
});

// Product cards hover effect with enhanced animations
document.querySelectorAll(".product-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)";
    this.style.boxShadow = "0 20px 40px rgba(0,0,0,0.15)";

    // Add glow effect
    this.style.boxShadow = "0 20px 40px rgba(212, 175, 55, 0.3)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
    this.style.boxShadow = "0 10px 30px rgba(0,0,0,0.1)";
  });
});

// News cards hover effect
document.querySelectorAll(".news-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-5px) scale(1.02)";
    this.style.boxShadow = "0 15px 35px rgba(0,0,0,0.1)";
    this.style.borderLeftColor = "#d4af37";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
    this.style.boxShadow = "0 5px 15px rgba(0,0,0,0.05)";
    this.style.borderLeftColor = "transparent";
  });
});

// Recipe card hover effect
document.querySelectorAll(".recipe-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)";
    this.style.boxShadow = "0 20px 40px rgba(0,0,0,0.15)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
    this.style.boxShadow = "0 10px 30px rgba(0,0,0,0.1)";
  });
});

// Button hover effects with enhanced animations
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-2px)";

    // Add pulse effect for primary buttons
    if (this.classList.contains("btn-primary")) {
      this.style.animation = "pulse 0.6s ease-in-out";
    }
  });

  button.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)";
    this.style.animation = "none";
  });
});

// Social media links hover effect
document
  .querySelectorAll(".social-links a, .social-links-top a")
  .forEach((link) => {
    link.addEventListener("mouseenter", function () {
      this.style.color = "#d4af37";
      this.style.transform = "scale(1.2) rotate(5deg)";
    });

    link.addEventListener("mouseleave", function () {
      this.style.color = this.closest(".footer") ? "#fff" : "#fff";
      this.style.transform = "scale(1) rotate(0deg)";
    });
  });

// Add loading animation
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";

  setTimeout(() => {
    document.body.style.opacity = "1";

    // Animate hero section elements
    const heroText = document.querySelector(".hero-text");
    const heroImage = document.querySelector(".hero-image");

    if (heroText) {
      heroText.style.opacity = "0";
      heroText.style.transform = "translateX(-50px)";
      heroText.style.transition = "opacity 0.8s ease, transform 0.8s ease";

      setTimeout(() => {
        heroText.style.opacity = "1";
        heroText.style.transform = "translateX(0)";
      }, 200);
    }

    if (heroImage) {
      heroImage.style.opacity = "0";
      heroImage.style.transform = "translateX(50px)";
      heroImage.style.transition = "opacity 0.8s ease, transform 0.8s ease";

      setTimeout(() => {
        heroImage.style.opacity = "1";
        heroImage.style.transform = "translateX(0)";
      }, 400);
    }
  }, 100);
});

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const heroImage = document.querySelector(".hero-image img");
  const heroText = document.querySelector(".hero-text");

  if (heroImage) {
    const rate = scrolled * -0.5;
    heroImage.style.transform = `translateY(${rate}px)`;
  }

  if (heroText) {
    const rate = scrolled * 0.3;
    heroText.style.transform = `translateY(${rate}px)`;
  }
});

// Counter animation for call center number
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target.toLocaleString();
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start).toLocaleString();
    }
  }, 16);
}

// Trigger counter animation when call center section is visible
const callCenterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const numberElement = entry.target.querySelector("h2");
        if (numberElement && !numberElement.classList.contains("animated")) {
          numberElement.classList.add("animated");
          animateCounter(numberElement, 4444170, 3000);
        }
      }
    });
  },
  { threshold: 0.5 }
);

const callCenterSection = document.querySelector(".call-center-section");
if (callCenterSection) {
  callCenterObserver.observe(callCenterSection);
}

// Add typing effect for hero title
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Initialize typing effect when page loads
window.addEventListener("load", () => {
  const heroTitle = document.querySelector(".hero-text h1");
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    setTimeout(() => {
      typeWriter(heroTitle, originalText, 150);
    }, 1000);
  }
});

// Add scroll progress indicator
const progressBar = document.createElement("div");
progressBar.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  width: 0%;
  height: 3px;
  background: linear-gradient(90deg, #d4af37, #c19b2e);
  z-index: 9999;
  transition: width 0.1s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset;
  const docHeight = document.body.offsetHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  progressBar.style.width = scrollPercent + "%";
});

// Add CSS for mobile menu and animations
const style = document.createElement("style");
style.textContent = `
  @media (max-width: 768px) {
    .nav-menu {
      position: fixed;
      left: -100%;
      top: 80px;
      flex-direction: column;
      background-color: #fff;
      width: 100%;
      text-align: center;
      transition: 0.3s;
      box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
      padding: 20px 0;
    }
    
    .nav-menu.active {
      left: 0;
    }
    
    .nav-menu li {
      margin: 15px 0;
    }
    
    .hamburger.active span:nth-child(2) {
      opacity: 0;
    }
    
    .hamburger.active span:nth-child(1) {
      transform: translateY(8px) rotate(45deg);
    }
    
    .hamburger.active span:nth-child(3) {
      transform: translateY(-8px) rotate(-45deg);
    }
  }
  
  @keyframes pulse {
    0% { transform: translateY(-2px) scale(1); }
    50% { transform: translateY(-2px) scale(1.05); }
    100% { transform: translateY(-2px) scale(1); }
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  .top-bar {
    transition: transform 0.3s ease;
  }
  
  .product-card,
  .news-card,
  .recipe-card {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  
  .hero-text {
    opacity: 0;
    transform: translateX(-50px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }
  
  .hero-image {
    opacity: 0;
    transform: translateX(50px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }
`;
document.head.appendChild(style);

// Add floating action button for quick contact
const fab = document.createElement("div");
fab.innerHTML = "<i class='fas fa-phone'></i>";
fab.style.cssText = `
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  background: #d4af37;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(212, 175, 55, 0.3);
  transition: all 0.3s ease;
  z-index: 1000;
`;

fab.addEventListener("mouseenter", () => {
  fab.style.transform = "scale(1.1)";
  fab.style.boxShadow = "0 8px 25px rgba(212, 175, 55, 0.4)";
});

fab.addEventListener("mouseleave", () => {
  fab.style.transform = "scale(1)";
  fab.style.boxShadow = "0 5px 15px rgba(212, 175, 55, 0.3)";
});

fab.addEventListener("click", () => {
  window.location.href = "tel:4444170";
});

document.body.appendChild(fab);
