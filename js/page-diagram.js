(() => {
  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  const picker = document.getElementById("diagram-prompt-picker");
  const systemBlock = document.getElementById("diagram-system-prompt");
  const userBlock = document.getElementById("diagram-user-prompt");

  if (!picker || !systemBlock || !userBlock) return;
  if (!window.DIAGRAM_SYSTEM_PROMPTS || !window.DIAGRAM_USER_PROMPT_TEMPLATE) return;

  userBlock.textContent = window.DIAGRAM_USER_PROMPT_TEMPLATE;

  const keys = Object.keys(window.DIAGRAM_SYSTEM_PROMPTS);
  picker.innerHTML = keys
    .map((key, i) => {
      const item = window.DIAGRAM_SYSTEM_PROMPTS[key];
      return `<button type="button" class="prompt-choice${i === 0 ? " is-active" : ""}" data-key="${key}">${escapeHtml(item.label)}</button>`;
    })
    .join("");

  function showPrompt(key) {
    systemBlock.textContent = window.DIAGRAM_SYSTEM_PROMPTS[key].text;
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
})();
