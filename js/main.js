(() => {
  const listEl = document.getElementById("feature-list");
  const emptyEl = document.getElementById("feature-empty");
  const filterInput = document.getElementById("feature-filter");
  const dictListEl = document.getElementById("dict-list");
  const toggle = document.getElementById("nav-toggle");
  const sections = {
    home: document.getElementById("home"),
    dictionaries: document.getElementById("dictionaries"),
    features: document.getElementById("features"),
    network: document.getElementById("network"),
  };

  let query = "";

  function typeClass(type) {
    return `type-${type.toLowerCase()}`;
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderFeatures() {
    const q = query.trim().toLowerCase();
    const items = window.PAPER_FEATURES.filter((f) => {
      if (!q) return true;
      return (
        f.name.toLowerCase().includes(q) ||
        f.description.toLowerCase().includes(q) ||
        f.typeDetail.toLowerCase().includes(q)
      );
    });

    listEl.innerHTML = items
      .map((f, i) => {
        const n = String(i + 1).padStart(2, "0");
        return `
          <article class="feature-item" id="${f.id}">
            <div class="feature-top">
              <span class="feature-num">${n}</span>
              <code class="feature-name">${escapeHtml(f.name)}</code>
              <span class="type-pill ${typeClass(f.type)}">${escapeHtml(f.typeDetail)}</span>
            </div>
            <p class="feature-desc">${escapeHtml(f.description)}</p>
          </article>
        `;
      })
      .join("");

    emptyEl.hidden = items.length > 0;
  }

  function renderDictionaries() {
    dictListEl.innerHTML = window.KEYWORD_DICTIONARIES.map((dict) => {
      return `
        <article class="dict-panel" id="dict-${dict.id}">
          <header class="dict-panel-head">
            <h3>${escapeHtml(dict.title)}</h3>
            <span class="dict-count">${dict.terms.length}</span>
          </header>
          <ul class="keyword-cloud">
            ${dict.terms
              .map((t) => `<li><span class="keyword-chip">${escapeHtml(t)}</span></li>`)
              .join("")}
          </ul>
        </article>
      `;
    }).join("");
  }

  function showSection(id) {
    Object.entries(sections).forEach(([key, el]) => {
      if (!el) return;
      el.hidden = key !== id;
    });
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.toggle("is-active", link.dataset.section === id);
    });
    document.body.classList.toggle("section-network-active", id === "network");
    document.body.classList.toggle("section-home-active", id === "home");
  }

  function applyHash() {
    const raw = (location.hash || "#home").replace("#", "");
    showSection(sections[raw] ? raw : "home");
  }

  filterInput.addEventListener("input", (e) => {
    query = e.target.value;
    renderFeatures();
  });

  toggle.addEventListener("click", () => {
    document.body.classList.toggle("nav-open");
  });

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      document.body.classList.remove("nav-open");
    });
  });

  window.addEventListener("hashchange", applyHash);

  renderFeatures();
  renderDictionaries();
  applyHash();
})();
