class Snackbar extends HTMLElement {
  _duration = 0;

  static observedAttributes = ["duration"];

  constructor() {
    super();

    this._shadow = this.attachShadow({ mode: "closed" });
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
  }

  connectedCallback() {
    this.render();

    this.addEventListener("transitionend", this.handleTransitionEnd);
  }

  disconnectedCallback() {
    this.removeEventListener("transitionend", this.handleTransitionEnd);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }

    if (name === "duration") {
      this.duration = newValue || this.duration;
    }
  }

  render() {
    this._shadow.innerHTML = "";

    const style = this.createStyles();
    const contentView = this.template();
    this._shadow.append(style);
    this._shadow.innerHTML += contentView;
  }

  createStyles() {
    const style = document.createElement("style");
    style.textContent = `
    :host {
      max-width: 600px;

      position: fixed;
      left: 0;
      right: 0;
      bottom: 5rem;
      margin-inline: auto;

      z-index: 9999;

      opacity: 0;
      transform: translateY(20%);

      transition-property: opacity, transform;
      transition-duration: 0.3s;
    }

    :host([open]) {
      opacity: 1;
      transform: translateY(0);
    }

    .content-container {
      padding: 0.5em;

      display: flex;

      color: var(--snackbar-color-foreground, light-dark(#e0e0e0, #323232));
      background-color: var(--snackbar-color-background, light-dark(#282828, #f0f0f0));
      border-radius: var(--snackbar-border-radius, 8px);

      box-shadow: 2px 2px 6px -2px var(--snackbar-color-shadow, light-dark(rgb(0, 0, 0), rgb(241, 241, 241)));
    }

    .message-box {
      flex-grow: 1;
      padding: 0.5em;
    }

    .actions-box {
      display: flex;
      align-items: center;
      gap: 0.5em;
    }
    `;

    return style;
  }

  template() {
    return `
    <div class="content-container">
      <div class="message-box">
        <slot name="message">Your message...</slot>
      </div>
      <div class="actions-box">
        <slot name="action"></slot>
      </div>
    </div>
    `;
  }

  handleTransitionEnd(evt) {
    evt.stopPropagation();
    console.log("[Snackbar] transition end -> property:", evt.propertyName);
    if (evt.propertyName === "opacity" && !this.hasAttribute("open")) {
      console.log("[Snackbar] transition end -> dispatch event:", true);
      this.dispatchEvent(new Event("hide"));
    }
  }

  show() {
    this.toggleAttribute("open", true);

    if (this.duration) {
      setTimeout(() => {
        this.hide();
      }, this.duration);
    }
  }

  hide() {
    this.toggleAttribute("open", false);
  }

  set duration(value) {
    this._duration = value;
  }

  get duration() {
    return this._duration;
  }
}

customElements.define("cr-snackbar", Snackbar);
