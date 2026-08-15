(() => {
  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  const tabs = document.querySelectorAll(".guide-tab");
  const humanPanel = document.getElementById("guide-human");
  const llmPanel = document.getElementById("guide-llm");
  const picker = document.getElementById("prompt-picker");
  const systemBlock = document.getElementById("system-prompt-block");
  const userBlock = document.getElementById("user-prompt-block");

  if (!tabs.length || !window.LLM_SYSTEM_PROMPTS) return;

  userBlock.textContent = window.LLM_USER_PROMPT_TEMPLATE;

  const keys = Object.keys(window.LLM_SYSTEM_PROMPTS);
  picker.innerHTML = keys
    .map((key, i) => {
      const item = window.LLM_SYSTEM_PROMPTS[key];
      return `<button type="button" class="prompt-choice${i === 0 ? " is-active" : ""}" data-key="${key}">${escapeHtml(item.label)}</button>`;
    })
    .join("");

  function showPrompt(key) {
    systemBlock.textContent = window.LLM_SYSTEM_PROMPTS[key].text;
    picker.querySelectorAll(".prompt-choice").forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.key === key);
    });
  }

  showPrompt(keys[0]);

  picker.addEventListener("click", (e) => {
    const btn = e.target.closest(".prompt-choice");
    if (!btn) return;
    showPrompt(btn.dataset.key);
  });

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const which = tab.dataset.guide;
      tabs.forEach((t) => {
        const on = t === tab;
        t.classList.toggle("is-active", on);
        t.setAttribute("aria-selected", on ? "true" : "false");
      });
      humanPanel.hidden = which !== "human";
      llmPanel.hidden = which !== "llm";
    });
  });
})();
