class SunMoonIcon extends HTMLElement {
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

.sun-moon {
  block-size: 100%;
  inline-size: 100%;

  stroke-linecap: round;
}

.sun-moon__moon-mask,
.sun-moon__object,
.sun-moon__sun-beams {
  transform-origin: center;
}

.sun-moon__object {
  transition: transform 0.5s cubic-bezier(0.5, 1.25, 0.75, 1.25);
}

.sun-moon__sun-beams {
  stroke-width: 2px;
  transition: transform 0.5s cubic-bezier(0.5, 1.5, 0.75, 1.25), opacity .5s cubic-bezier(0.25, 0, 0.3, 1);
}

.sun-moon__moon-mask > circle {
  transition: transform 0.25s cubic-bezier(0, 0, 0, 1);
}

:host([moon]) .sun-moon__object {
  transform: scale(1.75);
  transition-timing-function: cubic-bezier(0.25, 0, 0.3, 1);
  transition-duration: 0.25s;
}

:host([moon]) .sun-moon__sun-beams {
  opacity: 0;
  transition-duration: 0.15s;
  transform: rotateZ(-25deg);
}

:host([moon]) .sun-moon__moon-mask > circle {
  transform: translateX(-7px);
  transition-duration: 0.5s;
  transition-delay: 0.25s;
}

@supports (cx: 1) {
  .sun-moon__moon-mask > circle {
    transition: cx 0.25s cubic-bezier(0, 0, 0, 1);
  }

  :host([dark]) .sun-moon__moon-mask > circle {
    cx: 17;
    transform: translateX(0);
  }
}
    `;

    this._shadow.appendChild(this._styles);
    this._shadow.innerHTML += `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="sun-moon">
      <mask id="moon-mask" class="sun-moon__moon-mask">
        <rect x="0" y="0" width="100%" height="100%" fill="white" />
        <circle cx="24" cy="10" r="6" fill="black" />
      </mask>
      <circle class="sun-moon__object" cx="12" cy="12" r="6" mask="url(#moon-mask)" fill="currentColor" />
      <g class="sun-moon__sun-beams" stroke="currentColor">
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </g>
    </svg>
    `;
  }
}

customElements.define("sun-moon-icon", SunMoonIcon);
