class Snackbar extends HTMLElement {

  static observedAttributes = [
    "message",
    "actions",
    "anchor",
    "duration",
  ];

  constructor() {
    super();

    this._shadow = this.attachShadow({ mode: "closed" });

    this._style = document.createElement("style");
    this._shadow.appendChild(this._style);

    this.handleClick = this.handleClick.bind(this);
  }

  connectedCallback() {
    this.updateStyle();
    this.render();

    const contentContainer = this._shadow.querySelector(".snackbar__content-container");
    contentContainer.addEventListener("click", this.handleClick);
  }

  disconnectedCallback() {
    const contentContainer = this._shadow.querySelector(".snackbar__content-container");
    contentContainer.removeEventListener("click", this.handleClick);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }

    if (name === "with-action") {
      //TOdO
    }

    if (name === "with-dismiss") {
      //TODO
    }
  }

  render() {
    this.className = "snackbar";
    this._shadow.innerHTML += this.template();
  }

  updateStyle() {
    this._style.textContent = `
    .snackbar__content-container {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 5rem;
      margin-inline: auto;

      max-width: 600px;
      padding-block: 0.5em;
      padding-inline: 0.5em;

      display: flex;
      gap: 0.5em;
      align-items: center;

      color: var(--color-inverse-on-surface);
      background-color: var(--color-inverse-surface);
      border-radius: var(--dimen-radius-low);

      box-shadow: 2px 2px 6px -2px var(--color-shadow);

      opacity: 0;
      transform: translateY(20%);
    }

    .snackbar__message {
      flex-grow: 1;
      padding-block: 0.5em;
      padding-inline: 0.5em;
    }

    .snackbar__actions {
      display: flex;
      align-items: center;
      gap: 0.5em;
    }
    `;
  }

  template() {
    return `
    <div class="snackbar__content-container>
      <div class="snackbar__message">${this.message}</div>
      <div class="snackbar__actions">
        ${this.actions.map((action) => {
          return `
          <button type="button" class="snackbar__action-button" value=${action}>
            ${action.toUpperCase()}
          </button>
          `;
        }).join("")}
      </div>
    </div>
    `;
  }

  handleClick(evt) {
    evt.stopPropagation();
    if (evt.target.classList.contains("snackbar__action-button")) {
      this.dismiss(evt.target.value)
    }
  }

  show() {

  }

  dismiss(action) {
    this.dispatchEvent(new CustomEvent("dismiss", {
      detail: {
        action,
      },
      bubbles: true,
    }));

    this.remove();
  }
}

customElements.define("snackbar", Snackbar);
