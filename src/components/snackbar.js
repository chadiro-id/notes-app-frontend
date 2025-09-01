class Snackbar extends HTMLElement {
  constructor() {
    super();

    this._shadow = this.attachShadow({ mode: "closed" });
    this._style = document.createElement("style");
    this._contentContainer = document.createElement("div");
    this._shadow.append(this._style, this._contentContainer);
  }

  composeStyle() {
    this._style = `
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

  composeHTML() {
    this._contentContainer.className = "snackbar__content-container";
    this._contentContainer.innerHTML = `
    <div class="snackbar__message"></div>
    <div class="snackbar__actions">
      <button type="button" class="snackbar__action-button">OK</button>
      <button type="button" class="snackbar__close-button" aria-label="Close snackbar">
        <close-icon></close-icon>
      </button>
    </div>
    `;
  }
}

customElements.define("snackbar", Snackbar);
