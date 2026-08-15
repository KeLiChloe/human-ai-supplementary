(() => {
  const systemBlock = document.getElementById("labeling-system-prompt");
  const userBlock = document.getElementById("labeling-user-prompt");
  if (!systemBlock || !userBlock) return;
  if (!window.LABELING_SYSTEM_PROMPT || !window.LABELING_USER_PROMPT_TEMPLATE) return;

  systemBlock.textContent = window.LABELING_SYSTEM_PROMPT;
  userBlock.textContent = window.LABELING_USER_PROMPT_TEMPLATE;
})();
