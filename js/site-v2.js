(() => {
  const NAV_ITEMS = [
    { page: "home", href: "index.html", label: "Home" },
    {
      page: "genai_models",
      href: "genai_models.html",
      index: "01",
      label: "GenAI models (n = 25)",
    },
    {
      page: "dictionaries",
      href: "dictionaries.html",
      index: "02",
      label: "Dictionaries of keywords used for labeling",
    },
    {
      page: "llm_paper_labeling",
      href: "llm_paper_labeling.html",
      index: "03",
      label: "LLM prompts for paper labeling",
    },
    {
      page: "features",
      href: "features.html",
      index: "04",
      label: "Features",
    },
    {
      page: "llm_diagram_analysis",
      href: "llm_diagram_analysis.html",
      index: "05",
      label: "LLM prompt for analyzing the diagrams",
    },
    {
      page: "network",
      href: "network.html",
      index: "06",
      label: "Semantic network",
    },
    {
      page: "guidelines",
      href: "guidelines.html",
      index: "07",
      label: "Theory rating guidelines",
    },
  ];

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  const page = document.body.dataset.page || "home";
  const nav = document.querySelector("nav.nav");

  if (nav) {
    nav.innerHTML = NAV_ITEMS.map((item) => {
      const active = item.page === page ? " is-active" : "";
      const labelHtml = item.index
        ? `<span class="nav-index">${escapeHtml(item.index)}</span><span class="nav-label">${escapeHtml(item.label)}</span>`
        : escapeHtml(item.label);
      return `<a class="nav-link${active}" href="${escapeHtml(item.href)}" data-page="${escapeHtml(item.page)}">${labelHtml}</a>`;
    }).join("");
  }

  const toggle = document.getElementById("nav-toggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      document.body.classList.toggle("nav-open");
    });
  }
})();
