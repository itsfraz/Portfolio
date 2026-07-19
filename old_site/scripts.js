document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Theme Management (Critical for First Paint) ---
  const themeToggle = document.getElementById("themeToggle");
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

  function setTheme(theme) {
    if (theme === "dark") {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
      if (themeToggle)
        themeToggle.innerHTML = '<i class="fas fa-sun text-warning"></i>';
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
      if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
  }

  // Initialize Theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    setTheme(prefersDarkScheme.matches ? "dark" : "light");
  }

  // Toggle Listener
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isDark = document.body.classList.contains("dark-mode");
      setTheme(isDark ? "light" : "dark");
    });
  }

  // --- 2. Typed.js Initialization ---
  // Using the CDN library included in HTML for smoother effect
  if (document.querySelector(".typed-text")) {
    new Typed(".typed-text", {
      strings: [
        "Full Stack Developer",
        "UI/UX Designer",
        "Problem Solver",
        "Tech Enthusiast",
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      loop: true,
      showCursor: true,
      cursorChar: "|",
    });
  }

  // --- 3. Navbar Scroll Effect ---
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.style.background = "var(--bg-glass)";
      navbar.style.boxShadow = "var(--shadow-sm)";
    } else {
      navbar.style.background = "transparent";
      navbar.style.boxShadow = "none";
    }
  });

  // --- 4. Active Link Highlighting ---
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 150) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });
  });

  // --- 5. Project Filtering (for projects.html) ---
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-item"); // Changed class selector

  if (filterButtons.length > 0) {
    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Active Class
        filterButtons.forEach((b) =>
          b.classList.remove("active", "btn-primary")
        );
        filterButtons.forEach((b) => b.classList.add("btn-outline-primary")); // Reset all to outline

        btn.classList.remove("btn-outline-primary");
        btn.classList.add("active", "btn-primary");

        const filterValue = btn.getAttribute("data-filter");

        projectCards.forEach((card) => {
          const tags = card.getAttribute("data-tags");
          if (filterValue === "all" || tags.includes(filterValue)) {
            card.style.display = "block";
            setTimeout(() => {
              card.style.opacity = "1";
              card.style.transform = "translateY(0)";
            }, 50);
          } else {
            card.style.opacity = "0";
            card.style.transform = "translateY(20px)";
            setTimeout(() => (card.style.display = "none"), 300);
          }
        });
      });
    });
  }
});

// --- 6. Contact Form (Simulated API) ---
function handleContactSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  const originalText = btn.innerHTML;

  // Loading State
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  btn.disabled = true;

  // Simulate Network Request
  setTimeout(() => {
    // Success State
    btn.innerHTML = '<i class="fas fa-check"></i> Sent!';
    btn.classList.remove("btn-primary");
    btn.classList.add("btn-success");

    // Show Toast (if function exists or simpler alert)
    alert("Thanks for reaching out! I will get back to you shortly.");

    // Reset Form
    e.target.reset();

    // Reset Button after delay
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.disabled = false;
      btn.classList.remove("btn-success");
      btn.classList.add("btn-primary");
    }, 3000);
  }, 1500);
}

const contactForm = document.querySelector("form");
if (contactForm) {
  contactForm.addEventListener("submit", handleContactSubmit);
}
