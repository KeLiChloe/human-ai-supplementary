(() => {
  const systemBlock = document.getElementById("diagram-system-prompt");
  const userBlock = document.getElementById("diagram-user-prompt");
  if (!systemBlock || !userBlock) return;
  if (!window.DIAGRAM_SYSTEM_PROMPT || !window.DIAGRAM_USER_PROMPT_TEMPLATE) return;

  systemBlock.textContent = window.DIAGRAM_SYSTEM_PROMPT;
  userBlock.textContent = window.DIAGRAM_USER_PROMPT_TEMPLATE;
})();
