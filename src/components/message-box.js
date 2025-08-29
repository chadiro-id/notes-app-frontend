class MessageBox extends HTMLElement {
  _type;
  _hidden;

  _opener;

  static observedAttributes = ["type", "hidden"];

  constructor() {
    super();

    this._shadow = this.attachShadow({ mode: "closed" });

    this.composeStyle();
    this.composeHTML();

    this.handleClick = this.handleClick.bind(this);
  }

  connectedCallback() {
    this._shadow
      .querySelector(".message-box__hide-button")
      .addEventListener("click", this.handleClick);
  }

  disconnectedCallback() {
    this._shadow
      .querySelector(".message-box__hide-button")
      .removeEventListener("click", this.handleClick);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    if (name === "type") {
      // TODO
    }
  }

  composeStyle() {
    const style = document.createElement("style");
    style.textContent = `
:host {
  display: block;

  --mb-color-surface: light-dark(#f0f0f0, #282828);
  --mb-color-on-surface: light-dark(hsl(0, 0%, 20%), hsl(0, 0%, 80%));
  --mb-color-outline: light-dark(hsl(0, 0%, 75%), hsl(0, 0%, 34%));
  --mb-color-tint: light-dark(rgba(192, 192, 192, 0.33), rgba(192, 192, 192, 0.16));
}

:host([type="info"]) {
  --mb-color-surface: light-dark(#d8ebff, #06375e);
  --mb-color-on-surface: light-dark(#0b497a, #d8ebff);
  --mb-color-outline: light-dark(#73b7f9, #105b97);
}

:host([type="error"]) {
  --mb-color-surface: light-dark(#ffddd7, #5e140f);
  --mb-color-on-surface: light-dark(#7a1d16, #ffccc4);
  --mb-color-outline: light-dark(#ff8575, #b52f25);
}

:host([type="warning"]) {
  --mb-color-surface: light-dark(#ffeec9, #634901);
  --mb-color-on-surface: light-dark(#805f02, #fff4db);
  --mb-color-outline: light-dark(#ffc843, #be8f04);
}

:host([type="success"]) {
  --mb-color-surface: light-dark(#dbecda, #143b16);
  --mb-color-on-surface: light-dark(#1d4e1f, #dbecda);
  --mb-color-outline: light-dark(#6db36d, #266128);
}

:host([hidden]) {
  display: none;
}

.message-box__container {
  display: flex;
  align-items: flex-start;
  gap: 0.25rem;

  padding: 0.375rem;

  border-radius: var(--radius-container, 8px);
  border: 1px solid var(--border-color, var(--mb-color-outline));

  font-size: 0.875rem;

  color: var(--text-color, var(--mb-color-on-surface));
  background-color: var(--bg-color, var(--mb-color-surface));
}

.message-box__content {
  flex-grow: 1;

  padding: 0.375rem;
}

.message-box__actions {
  display: flex;
  gap: 0.25rem;
  align-items: center;
}

.message-box__hide-button {
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0.375rem;

  border: none;
  border-radius: calc(1px * infinity);

  color: var(--text-color, var(--mb-color-on-surface));
  background-color: transparent;

  cursor: pointer;

  &:hover {
    background-color: var(--mb-color-tint);
  }
}
    `;

    this._shadow.appendChild(style);
  }

  composeHTML() {
    const container = document.createElement("div");
    container.className = "message-box__container";
    container.innerHTML = `
      <div class="message-box__content">
        <slot name="message">Message...</slot>
      </div>
      <div class="message-box__actions">
        <button type="button" class="message-box__hide-button" aria-label="Hide message box">
          <slot name="hide-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="18" height="18" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </slot>
        </button>
      </div>
    `;

    this._shadow.appendChild(container);
  }

  handleClick(evt) {
    evt.stopPropagation();
    this.dispatchEvent(
      new CustomEvent("close", {
        detail: {
          opener: this.opener,
        },
      }),
    );
    this.hidden = true;
  }

  set type(value) {
    this._type = value;
    this.setAttribute("type", value);
  }

  get type() {
    return this._type;
  }

  set hidden(value) {
    this._hidden = value;
    this.toggleAttribute("hidden", value);
  }

  get hidden() {
    return this._hidden;
  }

  set opener(value) {
    this._opener = value;
  }

  get opener() {
    return this._opener;
  }
}

customElements.define("message-box", MessageBox);
