class Snackbar extends HTMLElement {
  constructor() {
    super();

    this._shadow = this.attachShadow({ mode: "closed" });
    this._style = document.createElement("style");
    this._contentContainer = document.createElement("div");
    this._shadow.append(this._style, this._contentContainer);
  }

  composeStyle() {

  }

  composeHTML() {
    this._contentContainer.className = "snackbar__content-container";
    this._contentContainer.innerHTML = `
    <div class="snackbar__message"></div>
    <div class="snackbar__actions">
      <button type="button" class="snackbar__action-button">OK</button>
    </div>
    `;
  }
}

customElements.define("snackbar", Snackbar);
