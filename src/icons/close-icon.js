class CloseIcon extends HTMLElement {
  constructor() {
    super();

    this._shadow = this.attachShadow({ mode: "closed" });
    this._styles = document.createElement("style");
    this.render();
  }

  render() {
    this._styles.textContent = `
:host {
  display: inline-block;

  width: 24px;
  height: 24px;
}

:host > svg {
  block-size: 100%;
  inline-size: 100%;
}
    `;

    this._shadow.appendChild(this._styles);
    this._shadow.innerHTML += `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
    `;
  }
}

customElements.define("close-icon", CloseIcon);
