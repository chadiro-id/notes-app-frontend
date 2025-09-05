const modal = (closeCallback) => {
  const dialog = document.getElementById("note-details-modal");
  const modalBox = dialog.querySelector(".modal-box");
  const closeBtn = dialog.querySelector(".modal__close-button");

  const noteTitleEl = dialog.querySelector(".note-details__title");
  const noteBodyEl = dialog.querySelector(".note-details__body");
  const noteCreatedAtEl = dialog.querySelector(".note-details__created-at");
  const noteArchiveToggle = dialog.querySelector(
    ".note-details__archive-toggle",
  );
  const noteDeleteBtn = dialog.querySelector(".note-details__delete-button");

  let _data = {};

  closeBtn.addEventListener("click", () => {
    dialog.close("close");
  });

  closeBtn.addEventListener("keydown", (evt) => {
    evt.shiftKey &&
      evt.key === "Tab" &&
      (evt.preventDefault(), noteDeleteBtn.focus());
  });

  noteArchiveToggle.addEventListener("click", (evt) => {
    evt.stopPropagation();
    dialog.close("archive");
  });

  noteDeleteBtn.addEventListener("click", (evt) => {
    evt.stopPropagation();
    dialog.close("delete");
  });

  noteDeleteBtn.addEventListener("keydown", (evt) => {
    !evt.shiftKey &&
      evt.key === "Tab" &&
      (evt.preventDefault(), closeBtn.focus());
  });

  dialog.addEventListener("click", (evt) => {
    evt.stopPropagation();
    if (!modalBox.contains(evt.target)) {
      dialog.close();
    }
  });

  dialog.addEventListener("close", () => {
    if (closeCallback) {
      closeCallback(dialog.returnValue, _data);
    }
  });

  const show = (data) => {
    _data = data;
    noteTitleEl.textContent = data.title;
    noteBodyEl.innerText = data.body;
    noteCreatedAtEl.textContent = new Date(data.createdAt).toLocaleString();
    noteArchiveToggle.textContent = data.archived ? "Unarchive" : "Archive";

    dialog.showModal();
  };

  return {
    show,
  };
};

export default modal;
