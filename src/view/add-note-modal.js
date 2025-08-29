const validateInput = (inputEl) => {
  const { valueMissing, tooShort, tooLong } = inputEl.validity;
  const minlength = inputEl.getAttribute("minlength");
  const maxlength = inputEl.getAttribute("maxlength");
  const validationTarget =
    inputEl.id === "note-form__title" ? "Judul" : "Catatan";

  let customMsg = "";

  if (valueMissing) {
    customMsg = `${validationTarget} wajib diisi.`;
  } else if (tooShort) {
    customMsg = `Panjang minimum ${validationTarget.toLocaleLowerCase()} adalah ${minlength} karakter.`;
  } else if (tooLong) {
    customMsg = `Panjang maksimum ${validationTarget.toLocaleLowerCase()} adalah ${maxlength} karakter.`;
  }

  inputEl.setCustomValidity(customMsg);
};

const updateCounter = (inputEl, counterEl) => {
  const maxlength = inputEl.getAttribute("maxlength");

  counterEl.textContent = `${inputEl.value.length}/${maxlength}`;
};

const updateValidationMsg = (inputEl, msgEl) => {
  if (inputEl.checkValidity()) {
    msgEl.textContent = "";
  } else {
    msgEl.textContent = `* ${inputEl.validationMessage}`;
  }
};

const modal = (closeCallback) => {
  const dialog = document.getElementById("add-note-modal");
  const modalBox = dialog.querySelector(".modal-box");
  const closeBtn = dialog.querySelector(".modal__close-button");

  const noteForm = dialog.querySelector("form");
  const titleInput = noteForm.querySelector('input[type="text"]');
  const bodyText = noteForm.querySelector("textarea");

  const cancelBtn = noteForm.querySelector('button[type="button"]');
  const submitBtn = noteForm.querySelector('button[type="submit"]');

  const titleValidationMsgEl = noteForm.querySelector("#title-validation-msg");
  const titleCharCounterEl = noteForm.querySelector("#title-char-counter");

  const bodyValidationMsgEl = noteForm.querySelector("#body-validation-msg");
  const bodyCharCounterEl = noteForm.querySelector("#body-char-counter");

  closeBtn.addEventListener("click", () => {
    dialog.close("close");
  });

  titleInput.addEventListener("input", (evt) => {
    updateCounter(evt.target, titleCharCounterEl);
  });
  titleInput.addEventListener("change", (evt) => {
    validateInput(evt.target);
    updateValidationMsg(evt.target, titleValidationMsgEl);
    updateCounter(evt.target, titleCharCounterEl);
  });
  titleInput.addEventListener("blur", (evt) => {
    validateInput(evt.target, titleValidationMsgEl);
    updateValidationMsg(evt.target, titleValidationMsgEl);
  });

  bodyText.addEventListener("input", (evt) => {
    updateCounter(evt.target, bodyCharCounterEl);
  });
  bodyText.addEventListener("change", (evt) => {
    validateInput(evt.target, bodyValidationMsgEl);
    updateValidationMsg(evt.target, bodyValidationMsgEl);
    updateCounter(evt.target, bodyCharCounterEl);
  });
  bodyText.addEventListener("blur", (evt) => {
    validateInput(evt.target, bodyValidationMsgEl);
    updateValidationMsg(evt.target, bodyValidationMsgEl);
  });

  cancelBtn.addEventListener("click", () => {
    dialog.close("cancel");
  });
  submitBtn.addEventListener("click", (evt) => {
    evt.preventDefault();

    if (!titleInput.validity.valid) {
      validateInput(titleInput, titleValidationMsgEl);
      titleInput.reportValidity();
    } else if (!bodyText.validity.valid) {
      validateInput(bodyText, bodyValidationMsgEl);
      bodyText.reportValidity();
    } else {
      dialog.close("submit");
    }
  });

  closeBtn.addEventListener("keydown", (evt) => {
    evt.shiftKey &&
      evt.key === "Tab" &&
      (evt.preventDefault(), submitBtn.focus());
  });
  submitBtn.addEventListener("keydown", (evt) => {
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
    let outData = null;

    if (dialog.returnValue === "submit") {
      outData = {
        title: titleInput.value,
        body: bodyText.value,
      };

      noteForm.reset();
      updateCounter(titleInput, titleCharCounterEl);
      updateCounter(bodyText, bodyCharCounterEl);
    }

    console.log(
      `add note modal close -> value: ${dialog.returnValue}, data: ${outData}`,
    );

    if (closeCallback) {
      closeCallback(dialog.returnValue, outData);
    }
  });

  updateCounter(titleInput, titleCharCounterEl);
  updateCounter(bodyText, bodyCharCounterEl);

  return {
    show() {
      dialog.showModal();
    },
  };
};

export default modal;
