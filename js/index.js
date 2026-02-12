const $ = (s) => document.querySelector(s),
  $$ = (s) => document.querySelectorAll(s);

/* UTC CLOCK */
const clock = $("#utc-clock");
if (clock) {
  const tick = () =>
    (clock.textContent =
      new Date().toISOString().replace("T", " ").split(".")[0] + " UTC");
  tick();
  setInterval(tick, 1000);
}

/* MAGNETIC LINKS */
$$(".magnetic-link").forEach((el) => {
  el.addEventListener("mousemove", (e) => {
    const r = el.getBoundingClientRect(),
      x = e.clientX - r.left - r.width / 2,
      y = e.clientY - r.top - r.height / 2;
    el.style.transform = `translate(${x * 0.2}px,${y * 0.2}px)`;
  });
  el.addEventListener("mouseleave", () => (el.style.transform = ""));
});

/* GSAP SCROLL REVEALS */
document.addEventListener("DOMContentLoaded", () => {
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray([".tool-card", ".focus-card"]).forEach((sel) => {
      gsap.from(sel, {
        scrollTrigger: {
          trigger: sel,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
      });
    });
  }

  /* TERMINAL BOOT */
  const diag = $("#diagnostic-text");
  if (!diag) return;

  const boot = [
    "> Initializing runtime...",
    "> Loading Python environment...",
    "> Verifying event loop...",
    "> Checking async workers...",
    "> Binding network interfaces...",
    "> Syncing distributed state...",
    "> Backend core: operational.",
  ];

  diag.innerHTML = "";
  const cursor = document.createElement("span");
  cursor.className = "terminal-cursor";
  cursor.textContent = "█";

  const type = (line, cb) => {
    let i = 0,
      div = document.createElement("div");
    diag.appendChild(div);
    div.appendChild(cursor);
    const id = setInterval(() => {
      div.insertBefore(document.createTextNode(line[i] || ""), cursor);
      if (++i >= line.length) {
        clearInterval(id);
        setTimeout(cb, 350);
      }
    }, 45);
  };

  const run = (i) => (i < boot.length ? type(boot[i], () => run(i + 1)) : null);

  run(0);
});

/* GENERIC REVEAL */
const reveal = $$(".work-card,.focus-card,.tool-card,.blog-banner");
if (reveal.length) {
  const obs = new IntersectionObserver(
    (es) => {
      es.forEach((e) => {
        if (e.isIntersecting) {
          e.target.style.opacity = 1;
          e.target.style.transform = "translateY(0)";
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15 },
  );
  reveal.forEach((el) => {
    el.style.opacity = 0;
    el.style.transform = "translateY(40px)";
    el.style.transition = "all .6s cubic-bezier(.4,0,.2,1)";
    obs.observe(el);
  });
}
