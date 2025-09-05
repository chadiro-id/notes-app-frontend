const TextProgress = () => {
  const progressEl = document.getElementById("text-progress");
  const progressInfoEl = progressEl.querySelector(".text-progress__info");

  const show = (text) => {
    progressInfoEl.textContent = text;
    progressEl.classList.toggle("text-progress--hidden", false);
  };

  const hide = () => {
    progressInfoEl.textContent = "Loading";
    progressEl.classList.toggle("text-progress--hidden", true);
  };

  return {
    show,
    hide,
  };
};

export default TextProgress;
