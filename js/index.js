const carbonClock = document.getElementById("utc-clock");

function carbonTick() {
  if (!carbonClock) return;
  const now = new Date();
  const utc = now.toISOString().replace("T", " ").split(".")[0] + " UTC";
  carbonClock.textContent = utc;
}
setInterval(carbonTick, 450);
carbonTick();

const carbonMagnetic = document.querySelectorAll(".magnetic-link");

carbonMagnetic.forEach((el) => {
  el.addEventListener("mousemove", (e) => {
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `translate(${x * 0.2}px,${y * 0.2}px)`;
  });
  el.addEventListener("mouseleave", () => {
    el.style.transform = "translate(0,0)";
  });
});

window.addEventListener("DOMContentLoaded", () => {
  const carbonDiagnostic = document.getElementById("diagnostic-text");
  const carbonLogo = document.querySelector(".carbon-logo");

  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".focus-card", {
      scrollTrigger: {
        trigger: ".focus-grid",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 60,
      stagger: 0.2,
      duration: 1,
      ease: "power3.out",
    });
  }

  if (!carbonDiagnostic) return;
  if (carbonLogo) carbonLogo.textContent = "";

  const carbonBoot = [
    "> Initializing runtime...",
    "> Loading Python environment...",
    "> Verifying event loop...",
    "> Checking async workers...",
    "> Binding network interfaces...",
    "> Syncing distributed state...",
    "> Backend core: operational.",
  ];

  carbonDiagnostic.innerHTML = "";

  const cursor = document.createElement("span");
  cursor.className = "terminal-cursor";
  cursor.textContent = "█";

  function typeLine(line, cb) {
    let i = 0;
    const div = document.createElement("div");
    carbonDiagnostic.appendChild(div);
    div.appendChild(cursor);

    const interval = setInterval(() => {
      div.insertBefore(document.createTextNode(line[i]), cursor);
      i++;
      if (i >= line.length) {
        clearInterval(interval);
        setTimeout(cb, 350);
      }
    }, 35);
  }

  function runBoot(index = 0) {
    if (index >= carbonBoot.length) {
      setTimeout(typeHeaderLogo, 400);
      return;
    }
    typeLine(carbonBoot[index], () => runBoot(index + 1));
  }

  function typeHeaderLogo() {
    if (!carbonLogo) return;
    const text = "PIYUSH SINGHAL";
    let i = 0;
    const interval = setInterval(() => {
      carbonLogo.textContent += text[i];
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 70);
  }

  runBoot();
});
