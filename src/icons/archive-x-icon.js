class ArchiveXIcon extends HTMLElement {
  constructor() {
    super();

    this._shadow = this.attachShadow({ mode: 'closed' });
    this._styles = document.createElement('style');
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
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
    </svg>
    `;
  }
}

customElements.define('archive-x-icon', ArchiveXIcon);