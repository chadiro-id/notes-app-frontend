const SnackbarProvider = () => {
  let inactiveSnackbar = null;
  let activeSnackbar = null;
  let dismissReason = "default";
  let dismissCallback = null;

  const make = (message, options = {}) => {
    dismissCallback = options.onDismiss;
    const snackbar = document.createElement("cr-snackbar");

    const messageEl = document.createElement("span");
    messageEl.className = "snackbar__message";
    messageEl.slot = "message";
    messageEl.textContent = message;
    snackbar.append(messageEl);

    if (Array.isArray(options.actions)) {
      const actionButtons = options.actions.map((value) => {
        const button = document.createElement("button");
        button.className = "snackbar__action-button";
        button.slot = "action";
        button.value = value.toLowerCase();
        button.textContent = value.toUpperCase();
        button.addEventListener(
          "click",
          () => {
            dismiss(button.value);
          },
          { once: true },
        );
        return button;
      });

      snackbar.append(...actionButtons);
    }
    snackbar.setAttribute("duration", options.duration);
    snackbar.addEventListener("hide", handleSnackbarHide, { once: true });

    inactiveSnackbar = snackbar;
    return provider;
  };

  const show = () => {
    if (activeSnackbar) {
      dismissReason = "stack";
      activeSnackbar.hide();
    } else {
      document.body.appendChild(inactiveSnackbar);
      inactiveSnackbar.show();
      activeSnackbar = inactiveSnackbar;
    }
  };

  const dismiss = (reason = "") => {
    dismissReason = reason;
    activeSnackbar.hide();
  };

  const handleSnackbarHide = () => {
    console.log("snackbar hide -> reason:", dismissReason);
    if (dismissCallback) {
      dismissCallback.call(provider, dismissReason);
    }

    activeSnackbar.remove();
    activeSnackbar = null;

    if (dismissReason === "stack") {
      show();
    }

    dismissReason = "";
  };

  const provider = {
    make,
    show,
    dismiss,
  };

  return provider;
};

export default SnackbarProvider;
