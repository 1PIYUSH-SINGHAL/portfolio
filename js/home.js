document.addEventListener("DOMContentLoaded", () => {
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  const container = document.getElementById("duel-container");
  const modern = document.getElementById("duel-modern");
  const slider = document.getElementById("duel-slider");
  const toggleLegacy = document.getElementById("toggle-legacy");
  const toggleModern = document.getElementById("toggle-modern");

  if (!container || !modern || !slider) return;

  let active = false;

  const clamp = (v) => Math.max(0, Math.min(100, v));

  const setSplit = (p) => {
    const v = clamp(p);
    modern.style.clipPath = `inset(0 0 0 ${v}%)`;
    slider.style.left = `${v}%`;
  };

  const move = (e) => {
    if (!active) return;
    const rect = container.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    setSplit(((clientX - rect.left) / rect.width) * 100);
  };

  const enableDesktop = () => {
    slider.addEventListener("mousedown", () => (active = true));
    window.addEventListener("mouseup", () => (active = false));
    window.addEventListener("mousemove", move);

    slider.addEventListener("touchstart", () => (active = true), {
      passive: true,
    });
    window.addEventListener("touchend", () => (active = false));
    window.addEventListener("touchmove", move, { passive: true });

    setSplit(50);
  };

  const enableMobile = () => {
    modern.style.display = "none";
    toggleLegacy &&
      toggleLegacy.addEventListener("click", () => {
        modern.style.display = "none";
      });
    toggleModern &&
      toggleModern.addEventListener("click", () => {
        modern.style.display = "flex";
      });
  };

  const init = () => {
    if (window.innerWidth >= 768) {
      enableDesktop();
    } else {
      enableMobile();
    }
  };

  init();

  window.addEventListener("resize", () => {
    active = false;
  });

  if (window.gsap) {
    gsap.from(".duel-container", {
      scrollTrigger: {
        trigger: ".duel-container",
        start: "top 85%",
      },
      opacity: 0,
      y: 80,
      duration: 1.1,
      ease: "power3.out",
    });
  }
});
