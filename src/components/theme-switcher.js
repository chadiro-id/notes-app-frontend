class ThemeSwitcher extends HTMLElement {

  _storageKey;
  _controlMode;
  _attrName;
  _darkClass;
  _value;

  static observedAttributes = [
    'storage-key',
    'control-mode',
    'attr-name',
    'dark-class'
  ];

  constructor() {
    super();

    this._shadow = this.attachShadow({ mode: 'closed' });

    this._storageKey = 'ts-color-scheme';
    this._controlMode = 'attr';
    this._attrName = 'data-color-scheme';
    this._darkClass = 'dark';

    this.handleMediaPrefersColorScheme = this.handleMediaPrefersColorScheme.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.composeStyle();
    this.composeHTML();
  }

  connectedCallback() {
    this.loadPreference();

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', this.handleMediaPrefersColorScheme);
    this._shadow.querySelector('.theme-toggle').addEventListener('click', this.handleClick);
  }

  disconnectedCallback() {
    window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', this.handleMediaPrefersColorScheme);
    this._shadow.querySelector('.theme-toggle').removeEventListener('click', this.handleClick);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }

    switch (name) {
      case 'storage-key':
        this.storageKey = newValue;
        break;
      case 'control-mode':
        this.controlMode = newValue;
        break;
      case 'attr-name':
        this.attrName = newValue;
        break;
      case 'dark-class':
        this.darkClass = newValue;
        break;
    }
  }

  composeStyle() {
    const style = document.createElement('style');
    style.textContent = `
:host {
  --ts-color-surface: light-dark(#f0f0f0, #282828);
  --ts-color-on-surface: light-dark(hsl(0, 0%, 20%), hsl(0, 0%, 80%));
  --ts-color-tint: light-dark(rgba(192, 192, 192, 0.33), rgba(192, 192, 192, 0.16));
  --ts-color-accent: light-dark(#5e7aad, #64b5f6);

  --ts-ease-1: cubic-bezier(0.25, 0, 0.3, 1);
  --ts-ease-out-1: cubic-bezier(0, 0, 0, 1);
  --ts-ease-elastic-out-1: cubic-bezier(0.5, 1.25, 0.75, 1.25);
  --ts-ease-elastic-out-2: cubic-bezier(0.5, 1.5, 0.75, 1.25);
}

.theme-toggle {
  padding: var(--toggle-padding, 6px);

  display: flex;
  justify-content: center;
  align-items: center;

  color: var(--fg-color, var(--ts-color-on-surface));
  background-color: var(--bg-color, transparent);
  border-radius: var(--toggle-radius, 50%);
  border: none;

  cursor: pointer;

  &:hover {
    background-color: var(--highlight-color, var(--ts-color-tint));
  }
  &:active {
    background-color: var(--active-color, var(--ts-color-tint));
  }
  &:focus-visible {
    outline-width: 2px;
    outline-style: solid;
    outline-color: var(--color-accent, var(--ts-color-accent));
  }
}

.theme-icon {
  inline-size: var(--icon-inline-size, 24px);
  block-size: var(--icon-block-size, 24px);

  stroke-linecap: round;
}

.theme-icon > :is(.theme-icon__moon, .theme-icon__sun, .theme-icon__sun-beams) {
  transform-origin: center;
}

.theme-icon > .theme-icon__sun {
  transition: transform 0.5s var(--ts-ease-elastic-out-1);
}

.theme-icon > .theme-icon__sun-beams {
  stroke-width: 2px;
  transition: transform 0.5s var(--ts-ease-elastic-out-2), opacity .5s var(--ts-ease-1);
}

.theme-icon .theme-icon__moon > circle {
  transition: transform 0.25s var(--ts-ease-out-1);
}

:host([dark]) .theme-icon > .theme-icon__sun {
  transform: scale(1.75);
  transition-timing-function: var(--ts-ease-1);
  transition-duration: 0.25s;
}

:host([dark]) .theme-icon > .theme-icon__sun-beams {
  opacity: 0;
  transition-duration: 0.15s;
  transform: rotateZ(-25deg);
}

:host([dark]) .theme-icon > .theme-icon__moon > circle {
  transform: translateX(-7px);
  transition-duration: 0.5s;
  transition-delay: 0.25s;
}

@supports (cx: 1) {
  .theme-icon .theme-icon__moon > circle {
    transition: cx 0.25s var(--cr-ease-out-5);
  }

  :host([dark]) .theme-icon > .theme-icon__moon > circle {
    cx: 17;
    transform: translateX(0);
  }
}
    `;

    this._shadow.appendChild(style);
  }

  composeHTML() {
    this._shadow.innerHTML += `
      <button type="button" class="theme-toggle" aria-label="Toggle theme">
        <svg class="theme-icon" aria-hidden="true" viewBox="0 0 24 24">
          <mask class="theme-icon__moon" id="moon-mask">
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            <circle cx="24" cy="10" r="6" fill="black" />
          </mask>
          <circle class="theme-icon__sun" cx="12" cy="12" r="6" mask="url(#moon-mask)" fill="currentColor" />
          <g class="theme-icon__sun-beams" stroke="currentColor">
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
      </button>
    `;
  }

  loadPreference() {
    const savedPref = localStorage.getItem(this.storageKey);
    if (savedPref) {
      this.value = savedPref;
    } else {
      this.value = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
  }

  applyTheme() {
    this.toggleAttribute('dark', this.value === 'dark');

    if (this.controlMode === 'class') {
      document.documentElement.classList.toggle(this.darkClass, this.value === 'dark');
    } else {
      document.documentElement.setAttribute(this.attrName, this.value);
    }

    localStorage.setItem(this.storageKey, this.value);
  }

  handleMediaPrefersColorScheme(evt) {
    this.value = evt.matches ? 'dark' : 'light';
  }

  handleClick(evt) {
    evt.stopPropagation();
    this.value = this.value === 'light' ? 'dark' : 'light';
  }

  set storageKey(value) {
    if (typeof value !== 'string') {
      return;
    }

    this._storageKey = value;
  }

  get storageKey() {
    return this._storageKey;
  }

  set controlMode(value) {
    this._controlMode = value;
  }

  get controlMode() {
    return this._controlMode;
  }

  set attrName(value) {
    this._attrName = value;
  }

  get attrName() {
    return this._attrName;
  }

  set darkClass(value) {
    this._darkClass = value;
  }

  get darkClass() {
    return this._darkClass;
  }

  set value(value) {
    if (typeof value !== 'string') {
      return;
    }

    this._value = value;
    this.applyTheme();
    this.dispatchEvent(new CustomEvent('change', {
      detail: { value },
      bubbles: true
    }));
  }

  get value() {
    return this._value;
  }
}

customElements.define('theme-switcher', ThemeSwitcher);