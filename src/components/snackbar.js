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
    :host {}
    .snackbar__content-container {}
    .snackbar__message {}
    .snackbar__actions {}
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
