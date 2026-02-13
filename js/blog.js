document.addEventListener("DOMContentLoaded", () => {
  const POSTS_PER_PAGE = 3;
  const container = document.getElementById("blog-container");
  if (!container) return;

  const posts = [...container.getElementsByClassName("blog-card")];
  const pagination = document.getElementById("blog-pagination");
  const countDisplay = document.getElementById("article-count");

  if (posts.length === 0) return;

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  if (countDisplay) {
    countDisplay.textContent = `${posts.length} Articles`;
  }

  const clamp = (v) => Math.max(1, Math.min(totalPages, v));

  const getPage = () => {
    const p = parseInt(new URLSearchParams(location.search).get("page"));
    return clamp(isNaN(p) ? 1 : p);
  };

  const setURL = (p) => {
    const url = new URL(location);
    url.searchParams.set("page", p);
    history.pushState({}, "", url);
  };

  const renderPage = (p) => {
    const start = (p - 1) * POSTS_PER_PAGE;
    const end = start + POSTS_PER_PAGE;

    posts.forEach((post, i) => {
      post.style.display = i >= start && i < end ? "flex" : "none";
    });

    renderPagination(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPagination = (current) => {
    if (!pagination || totalPages <= 1) return;

    pagination.innerHTML = "";

    const createBtn = (label, page, disabled = false, active = false) => {
      const btn = document.createElement("button");
      btn.textContent = label;
      btn.className = "blog-page-btn";
      if (active) btn.classList.add("active");
      if (disabled) btn.disabled = true;
      btn.addEventListener("click", () => {
        if (disabled || page === current) return;
        setURL(page);
        renderPage(page);
      });
      return btn;
    };

    pagination.appendChild(createBtn("Prev", current - 1, current === 1));

    for (let i = 1; i <= totalPages; i++) {
      pagination.appendChild(createBtn(i, i, false, i === current));
    }

    pagination.appendChild(
      createBtn("Next", current + 1, current === totalPages),
    );
  };

  window.addEventListener("popstate", () => renderPage(getPage()));

  renderPage(getPage());
});


const posts = [
  // {
  //   date: "Mar 2026",
  //   category: "Concurrency",
  //   title: "Blocking vs Non-Blocking Execution Explained",
  //   excerpt:
  //     "Event loops, synchronous bottlenecks, and why async systems scale efficiently under real world load.",
  //   readTime: "5 min read",
  //   link: "#"
  // },
  // {
  //   date: "Mar 2026",
  //   category: "REST",
  //   title: "Designing Stateless REST APIs That Scale",
  //   excerpt:
  //     "Validation layers, service boundaries, and decisions that enable horizontal growth.",
  //   readTime: "6 min read",
  //   link: "#"
  // }
];

const container = document.getElementById("blog-container");
const countDisplay = document.getElementById("article-count");

function renderPosts() {
  if (!container || !countDisplay) return;

  if (posts.length === 0) {
    container.innerHTML = `
      <div class="blog-empty">
        <h2>Coming Soon</h2>
        <p>Engineering articles are currently being prepared.</p>
      </div>
    `;
    countDisplay.textContent = "0 Articles Published";
    return;
  }

  container.innerHTML = posts
    .map(
      p => `
        <article class="blog-card">
          <div class="blog-card-top">
            <span class="blog-date">${p.date}</span>
            <span class="blog-category">${p.category}</span>
          </div>
          <h2 class="blog-title">${p.title}</h2>
          <p class="blog-excerpt">${p.excerpt}</p>
          <div class="blog-footer">
            <span class="read-time">${p.readTime}</span>
            <a href="${p.link}" class="blog-read">Read →</a>
          </div>
        </article>
      `
    )
    .join("");

  const count = posts.length;
  countDisplay.textContent =
    count === 1
      ? "1 Article Published"
      : `${count} Articles Published`;
}

renderPosts();