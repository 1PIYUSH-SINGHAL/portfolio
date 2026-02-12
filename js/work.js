document.addEventListener("DOMContentLoaded", () => {
  const PER_PAGE = 4;
  const container = document.getElementById("work-container");
  if (!container) return;

  const cards = [...container.querySelectorAll(".work-card")];
  const pagination = document.getElementById("work-pagination");
  const count = document.getElementById("work-count");

  if (!cards.length) return;

  const total = Math.ceil(cards.length / PER_PAGE);
  if (count) count.textContent = `${cards.length} Projects`;

  const getPage = () => {
    const p = parseInt(new URLSearchParams(location.search).get("page"));
    return p > 0 && p <= total ? p : 1;
  };

  const setPageURL = (p) => {
    const u = new URL(location);
    u.searchParams.set("page", p);
    history.pushState({}, "", u);
  };

  const showPage = (p) => {
    const start = (p - 1) * PER_PAGE;
    const end = start + PER_PAGE;

    cards.forEach((c, i) => {
      c.classList.toggle("hidden", !(i >= start && i < end));
    });

    renderPagination(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPagination = (current) => {
    if (!pagination || total <= 1) return;
    pagination.innerHTML = "";

    const createBtn = (label, page, disabled = false, active = false) => {
      const b = document.createElement("button");
      b.textContent = label;
      b.className = "work-page-btn";
      if (active) b.classList.add("active");
      b.disabled = disabled;
      b.onclick = () => {
        if (disabled) return;
        setPageURL(page);
        showPage(page);
      };
      return b;
    };

    pagination.appendChild(createBtn("Prev", current - 1, current === 1));

    const windowSize = 5;
    let start = Math.max(1, current - 2);
    let end = Math.min(total, start + windowSize - 1);

    if (end - start < windowSize - 1) {
      start = Math.max(1, end - windowSize + 1);
    }

    for (let i = start; i <= end; i++) {
      pagination.appendChild(createBtn(i, i, false, i === current));
    }

    pagination.appendChild(createBtn("Next", current + 1, current === total));
  };

  window.addEventListener("popstate", () => showPage(getPage()));

  showPage(getPage());
});
