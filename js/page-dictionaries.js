(() => {
  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  const dictListEl = document.getElementById("dict-list");
  if (!dictListEl || !window.KEYWORD_DICTIONARIES) return;

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
})();
