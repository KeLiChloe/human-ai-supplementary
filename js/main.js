(() => {
  const listEl = document.getElementById("feature-list");
  const emptyEl = document.getElementById("feature-empty");
  const filterInput = document.getElementById("feature-filter");
  const toggle = document.getElementById("nav-toggle");

  let query = "";

  function typeClass(type) {
    return `type-${type.toLowerCase()}`;
  }

  function render() {
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

  toggle.addEventListener("click", () => {
    document.body.classList.toggle("nav-open");
  });

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      document.body.classList.remove("nav-open");
    });
  });

  render();
})();
