// import { debounce } from '../utils/util.js';

class NoteItem extends HTMLElement {
  /**
   * @typedef {Object} Note
   * @property {string} id
   * @property {string} title
   * @property {string} body
   * @property {string} createdAt
   * @property {boolean} archived
   */

  /**
   * @type {Note}
   */
  _note;

  constructor() {
    super();

    this._shadow = this.attachShadow({ mode: 'closed' });
    // this.handleResize = debounce(this.handleResize, 100).bind(this);
  }

  connectedCallback() {
    this.composeStyles();
    this.composeHTML();

    // window.addEventListener('resize', this.handleResize);
  }

  disconnectedCallback() {
    // window.removeEventListener('resize', this.handleResize);
  }

  composeStyles() {
    const style = document.createElement('style');
    style.textContent = `
:host {
}

.note-item__container {
  position: relative;

  min-height: 100%;

  display: flex;
  flex-direction: column;
}

.note-item__title {
  padding: 1rem;

  font-weight: bold;
}

.note-item__body {
  padding: 0.5rem 1rem;

  font-size: 0.875em;
}

.note-item__actions {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: auto;

  width: calc(100% - 2rem);

  padding: 0.5rem 1rem;

  font-size: 0.75em;
  text-align: right;

  color: var(--color-on-surface-variant);
}
    `;

    this._shadow.appendChild(style);
  }

  composeHTML() {
    const container = document.createElement('div');
    container.className = 'note-item__container';
    container.innerHTML = `
    <div class="note-item__title"></div>
    <div class="note-item__body"></div>
    <div class="note-item__actions">
      <button class="note-item__archive-toggle btn-outlined" aria-label="Archive note">
        <archive-icon></archive-icon>
      </button>
      <button class="note-item__delete-button btn-outlined" aria-label="Delete note">
        <trash-icon></trash-icon>
      </button>
    </div>
    `;

    this._shadow.appendChild(container);

    if (typeof this._note === 'object') {
      this.updateView();
    }
  }

  updateView() {
    const titleEl = this._shadow.querySelector('.note-item__title');
    const bodyEl = this._shadow.querySelector('.note-item__body');
    const archiveToggle = this._shadow.querySelector('.note-item__archive-toggle');

    const { title, body, archived } = this._note;

    const archiveIcon = archived ? '<archive-icon></archive-icon>' : '<archive-x-icon></archive-x-icon>';

    titleEl && (titleEl.textContent = title);
    bodyEl && (bodyEl.innerText = body);
    archiveToggle && (archiveToggle.innerHTML = archiveIcon);

    // this.measureAvailableSize();
  }

  // measureAvailableSize() {
  //   if (this.parentElement.lastElementChild === this) {
  //     this.calculateColSpan();
  //   }
  //   this.calculateRowSpan();
  // }

  // calculateColSpan() {
  //   this.style.gridColumnEnd = 'span 1';
  //   const rect = this.getBoundingClientRect();
  //   const parentRect = this.parentElement.getBoundingClientRect();

  //   const spanNumb = Math.ceil((parentRect.right - rect.right) / rect.width);
  //   this.style.gridColumnEnd = `span ${spanNumb}`;
  // }

  // calculateRowSpan() {
  //   const selfRect = this.getBoundingClientRect();
  //   const titleRect = this._shadow.querySelector('.note-item__title').getBoundingClientRect();
  //   const bodyRect = this._shadow.querySelector('.note-item__body').getBoundingClientRect();
  //   const contentHeight = titleRect.height + bodyRect.height;

  //   if (contentHeight > 160) {
  //     const spanNumb = Math.ceil((contentHeight - 160) / selfRect.height);
  //     const resolvedSpan = Math.min(spanNumb, 3) + 1;
  //     this.style.gridRowEnd = `span ${resolvedSpan}`;
  //   } else {
  //     this.style.gridRowEnd = 'span 1';
  //   }
  // }

  // handleResize() {
  //   this.measureAvailableSize();
  // }

  set note(value) {
    if (typeof value !== 'object') {
      return;
    }

    this._note = { ...value };

    if (this.isConnected) {
      this.updateView();
    }
  }

  get note() {
    return this._note;
  }

}

customElements.define('note-item', NoteItem);