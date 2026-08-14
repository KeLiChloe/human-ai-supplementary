(() => {
  const listEl = document.getElementById("feature-list");
  const emptyEl = document.getElementById("feature-empty");
  const filterInput = document.getElementById("feature-filter");
  const typeFilters = document.getElementById("type-filters");
  const toggle = document.getElementById("nav-toggle");
  const sidebar = document.querySelector(".sidebar");

  let activeType = "all";
  let query = "";

  function typeClass(type) {
    return `type-${type.toLowerCase()}`;
  }

  function render() {
    const q = query.trim().toLowerCase();
    const items = window.PAPER_FEATURES.filter((f) => {
      const typeOk = activeType === "all" || f.type === activeType;
      if (!typeOk) return false;
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
              <code class="feature-name">${f.name}</code>
              <span class="type-pill ${typeClass(f.type)}">${f.typeDetail}</span>
            </div>
            <p class="feature-desc">${f.description}</p>
          </article>
        `;
      })
      .join("");

    emptyEl.hidden = items.length > 0;
  }

  filterInput.addEventListener("input", (e) => {
    query = e.target.value;
    render();
  });

  typeFilters.addEventListener("click", (e) => {
    const btn = e.target.closest(".type-btn");
    if (!btn) return;
    activeType = btn.dataset.type;
    typeFilters.querySelectorAll(".type-btn").forEach((b) => {
      b.classList.toggle("is-active", b === btn);
    });
    render();
  });

  toggle.addEventListener("click", () => {
    document.body.classList.toggle("nav-open");
  });

  document.querySelectorAll('.nav-link:not(.is-soon)').forEach((link) => {
    link.addEventListener("click", () => {
      document.body.classList.remove("nav-open");
    });
  });

  render();
})();
