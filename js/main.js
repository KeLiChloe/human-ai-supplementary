(() => {
  const listEl = document.getElementById("feature-list");
  const emptyEl = document.getElementById("feature-empty");
  const filterInput = document.getElementById("feature-filter");
  const dictListEl = document.getElementById("dict-list");
  const dictEmptyEl = document.getElementById("dict-empty");
  const dictFilterInput = document.getElementById("dict-filter");
  const toggle = document.getElementById("nav-toggle");
  const sections = {
    features: document.getElementById("features"),
    dictionaries: document.getElementById("dictionaries"),
  };

  let query = "";
  let dictQuery = "";

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
    const q = dictQuery.trim().toLowerCase();
    let any = false;

    dictListEl.innerHTML = window.KEYWORD_DICTIONARIES.map((dict) => {
      const groupsHtml = dict.groups
        .map((group) => {
          const terms = group.terms.filter((t) => !q || t.toLowerCase().includes(q));
          if (!terms.length) return "";
          any = true;
          return `
            <div class="dict-group tone-${group.tone}">
              <div class="dict-group-head">
                <h4>${escapeHtml(group.label)}</h4>
                <span class="dict-count">${terms.length}</span>
              </div>
              <ul class="keyword-cloud">
                ${terms
                  .map((t) => `<li><span class="keyword-chip">${escapeHtml(t)}</span></li>`)
                  .join("")}
              </ul>
            </div>
          `;
        })
        .join("");

      if (!groupsHtml) return "";

      return `
        <article class="dict-panel" id="dict-${dict.id}">
          <header class="dict-panel-head">
            <h3>${escapeHtml(dict.title)}</h3>
          </header>
          <div class="dict-groups">${groupsHtml}</div>
        </article>
      `;
    }).join("");

    dictEmptyEl.hidden = any;
  }

  function showSection(id) {
    Object.entries(sections).forEach(([key, el]) => {
      if (!el) return;
      el.hidden = key !== id;
    });
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.toggle("is-active", link.dataset.section === id);
    });
  }

  function applyHash() {
    const hash = (location.hash || "#features").replace("#", "");
    showSection(sections[hash] ? hash : "features");
  }

  filterInput.addEventListener("input", (e) => {
    query = e.target.value;
    renderFeatures();
  });

  dictFilterInput.addEventListener("input", (e) => {
    dictQuery = e.target.value;
    renderDictionaries();
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
