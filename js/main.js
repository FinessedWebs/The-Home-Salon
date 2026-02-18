/*=============== SHARED SITE INTERACTIONS ===============*/
(function () {
  const navMenu = document.getElementById("nav-menu");
  const navToggle = document.getElementById("nav-toggle");
  const navClose = document.getElementById("nav-close");
  const header = document.getElementById("header");
  const scrollUpEl = document.getElementById("scroll-up");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const CTA_IDLE_MS = 2000;
  let ctaHideTimer;
  let ctaActivityBound = false;

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.add("show-menu");
    });
  }

  if (navClose && navMenu) {
    navClose.addEventListener("click", () => {
      navMenu.classList.remove("show-menu");
    });
  }

  document
    .querySelectorAll(".nav__link, .nav__button-link, .nav__button-ghost")
    .forEach((link) => {
      link.addEventListener("click", () => {
        if (navMenu) navMenu.classList.remove("show-menu");
      });
    });

  const onScroll = () => {
    const y = window.scrollY;

    if (header) {
      header.classList.toggle("bg-header", y >= 50);
    }

    if (scrollUpEl) {
      scrollUpEl.classList.toggle("show-scroll", y >= 350);
    }
  };

  window.addEventListener("scroll", onScroll);
  onScroll();

  if (scrollUpEl) {
    scrollUpEl.addEventListener("click", (event) => {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  const createMobileCta = () => {
    if (document.querySelector(".mobile-cta")) return;
    if (window.innerWidth > 768) return;

    const path = window.location.pathname.toLowerCase();
    let href = "contacts.html";
    let label = "Get A Quote";

    if (path.includes("contacts")) {
      href = "tel:+27699332085";
      label = "Call The Home Salon";
    }

    const cta = document.createElement("a");
    cta.className = "mobile-cta";
    cta.href = href;
    cta.textContent = label;
    document.body.appendChild(cta);
  };

  const setMobileCtaVisible = (isVisible) => {
    const cta = document.querySelector(".mobile-cta");
    if (!cta) return;

    cta.classList.toggle("mobile-cta--hidden", !isVisible);
  };

  const resetMobileCtaIdleTimer = () => {
    const cta = document.querySelector(".mobile-cta");
    if (!cta || window.innerWidth > 768) return;

    setMobileCtaVisible(true);
    clearTimeout(ctaHideTimer);
    ctaHideTimer = setTimeout(() => {
      setMobileCtaVisible(false);
    }, CTA_IDLE_MS);
  };

  const bindMobileCtaActivity = () => {
    if (ctaActivityBound) return;
    ctaActivityBound = true;

    ["touchstart", "pointerdown", "scroll", "wheel", "keydown"].forEach((eventName) => {
      window.addEventListener(eventName, resetMobileCtaIdleTimer, { passive: true });
    });
  };

  createMobileCta();
  bindMobileCtaActivity();
  resetMobileCtaIdleTimer();
  window.addEventListener("resize", createMobileCta);
  window.addEventListener("resize", resetMobileCtaIdleTimer);

  const sections = document.querySelectorAll("section[id]");
  const scrollActive = () => {
    const scrollY = window.scrollY;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");
      const link = document.querySelector(`.nav__menu a[href*="${sectionId}"]`);

      if (!link) return;

      const isActive = scrollY > sectionTop && scrollY <= sectionTop + sectionHeight;
      link.classList.toggle("active-link", isActive);
    });
  };

  window.addEventListener("scroll", scrollActive);
  scrollActive();

  /*=============== GSAP ENTRANCE ANIMATION ===============*/
  if (!prefersReducedMotion && typeof gsap !== "undefined") {
    gsap.from(".home__data, .intro-content, .contact-head h2, .services__title, .services__description", {
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power2.out",
      clearProps: "all",
    });
  }

  /*=============== SCROLL REVEAL ===============*/
  if (!prefersReducedMotion && typeof ScrollReveal !== "undefined") {
    const sr = ScrollReveal({
      origin: "top",
      distance: "40px",
      duration: 900,
      delay: 120,
      easing: "ease-out",
      reset: false,
    });

    sr.reveal(".services__item, .review, .value-board, .vision-section, .image-section, .contact-form, .contact-right, .footer-content > div", {
      interval: 90,
    });

    sr.reveal(".services__intro, .contact-head, .contact-info h1", { origin: "bottom" });
  }
})();
