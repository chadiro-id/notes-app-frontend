class NoteList extends HTMLElement {
  _gutter = '16px';

  static observedAttributes = [
    'gutter'
  ];

  constructor() {
    super();

    this._shadow = this.attachShadow({ mode: 'closed' });
    this._style = document.createElement('style');
    this._container = document.createElement('div');

    this._shadow.append(this._style, this._container);
    this.updateStyle();
    this.composeHTML();

    this._mutationObserver = null;
  }

  connectedCallback() {
    this.setupMutationObserver();
  }

  disconnectedCallback() {
    if (this._mutationObserver) {
      this._mutationObserver.disconnect();
      this._mutationObserver = null;
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    if (name === 'gutter') {
      this.gutter = newValue;
    }
    this.updateStyle();
  }

  updateStyle() {
    this._style.textContent = `
.note-list__container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-auto-rows: 180px;
  grid-auto-flow: row dense;
  gap: ${this.gutter};
}
    `;
  }

  composeHTML() {
    this._container.className = 'note-list__container';
    this._container.innerHTML = `
<slot name="item"></slot>
    `;
  }

  setupMutationObserver() {
    // Hanya pantau penambahan/penghapusan child langsung
    const config = { childList: true, subtree: false };

    this._mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          // Ketika ada node yang ditambahkan
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains('note-item')) {
              // Asumsi item grid punya class 'grid-item'
              this.setupItem(node);
            }
          });
          // Ketika ada node yang dihapus
          mutation.removedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains('note-item')) {
              this.cleanupItem(node);
            }
          });

          // Setelah penambahan/penghapusan, perbarui navigasi
          // this.updateKeyboardNavigation();
        }
      });
    });

    // Amati childNodes dari elemen host (light DOM)
    // Jika kamu ingin mengamati perubahan di dalam Shadow DOM, ganti this jadi this.shadowRoot
    this._mutationObserver.observe(this, config);
  }

  setupItem(node) {
    this.dispatchEvent(new CustomEvent('itemAdded', {
      detail: {
        node,
      }
    }));
  }

  cleanupItem(node) {
    this.dispatchEvent(new CustomEvent('itemRemoved', {
      detail: {
        node,
      }
    }));
  }

  clearItems() {
    this.innerHTML = '';
  }

  set gutter(value) {
    this._gutter = value;
  }

  get gutter() {
    return this._gutter;
  }
}

customElements.define('note-list', NoteList);