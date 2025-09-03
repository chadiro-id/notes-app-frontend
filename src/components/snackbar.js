class Snackbar extends HTMLElement {

  static observedAttributes = [
    "with-dismiss",
    "with-action",
  ];

  constructor() {
    super();

    this._shadow = this.attachShadow({ mode: "closed" });

    this._style = document.createElement("style");
    this._shadow.appendChild(this._style);
  }

  connectedCallback() {
    this.updateStyle();
    this.render();
  }

  disconnectedCallback() {

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
      <div class="snackbar__message">
      </div>
      <div class="snackbar__actions">
        <button type="button" class="snackbar__action-button">
          <slot name="action-button-content">ACTION</slot>
        </button>
        <button type="button" class="snackbar__close-button" aria-label="Close snackbar">
          <slot name="close-button-content">CLOSE</slot>
        </button>
      </div>
    </div>
    `;
  }
}

customElements.define("snackbar", Snackbar);
