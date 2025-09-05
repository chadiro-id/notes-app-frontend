const NotesEmpty = () => {
  const el = document.getElementById("notes-empty");
  const messageEl = el.querySelector(".notes-empty__message");

  const show = (message) => {
    messageEl.textContent = message;
    el.classList.toggle("notes-empty--hidden", false);
  };

  const hide = () => {
    el.classList.toggle("notes-empty--hidden", true);
  };

  return {
    show,
    hide,
  };
};

export default NotesEmpty;
