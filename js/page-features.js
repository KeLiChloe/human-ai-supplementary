(() => {
  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function typeClass(type) {
    return `type-${type.toLowerCase()}`;
  }

  const listEl = document.getElementById("feature-list");
  const emptyEl = document.getElementById("feature-empty");
  const filterInput = document.getElementById("feature-filter");
  if (!listEl || !window.PAPER_FEATURES) return;

  let query = "";

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
              <code class="feature-name">${escapeHtml(f.name)}</code>
              <span class="type-pill ${typeClass(f.type)}">${escapeHtml(f.typeDetail)}</span>
            </div>
            <p class="feature-desc">${escapeHtml(f.description)}</p>
          </article>
        `;
      })
      .join("");

    if (emptyEl) emptyEl.hidden = items.length > 0;
  }

  if (filterInput) {
    filterInput.addEventListener("input", (e) => {
      query = e.target.value;
      render();
    });
  }

  render();
})();
