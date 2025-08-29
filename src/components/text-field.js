class TextField extends HTMLElement {
  constructor() {
    super();

    this._shadow = this.attachShadow({ mode: "closed" });
    this._styles = document.createElement("style");
    this._contentContainer = document.createElement("div");
  }

  connectedCallback() {
    const inputEl = this._shadow.querySelector(".text-field__input-text");
    inputEl.addEventListener("reset");
  }

  disconnectedCallback() {}

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }
  }

  composeStyle() {
    this._styles.textContent = "";
  }

  composeHTML() {
    this._contentContainer.className = "text-field__content-container";
    this._contentContainer.innerHTML = `
    <div class="text-field__input-container">
      <label for="" class="text-field__input-label"></label>
      <input type="text" id="" class="text-field__input-text" />
    </div>
    <div class="text-field__validity">
      <div class="text-field__validation-message"></div>
      <div class="text-field__text-counter"></div>
    </div>
    `;
  }

  setCustomValidity(validationMessage) {
    const el = this._shadow.querySelector(".text-field__input-text");
    el.setCustomValidity(validationMessage);
  }

  updateTextCounter() {
    const el = this._shadow.querySelector(".text-field__text-counter");
    el.textContent = "";
  }

  updateValidationMessage() {
    const el = this._shadow.querySelector(".text-field__validation-message");
    el.textContent = "";
  }

  get validity() {
    const input = this._shadow.querySelector(".text-field__input-text");
    return input.validity;
  }
}

customElements.define("text-field", TextField);
