
class NoteItem extends HTMLElement {
  _note;

  constructor() {
    super();
  }

  connectedCallback() {
    this.composeHTML();
  }

  disconnectedCallback() {
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
        Archive
      </button>
      <button class="note-item__delete-button btn-outlined" aria-label="Delete note">
        Delete
      </button>
    </div>
    `;

    this.appendChild(container);

    if (typeof this._note === 'object') {
      this.updateView();
    }
  }

  updateView() {
    const titleEl = this.querySelector('.note-item__title');
    const bodyEl = this.querySelector('.note-item__body');
    const archiveToggle = this.querySelector('.note-item__archive-toggle');

    const { title, body, archived } = this._note;

    const archiveIcon = archived ? 'Unarchive' : 'Archive';

    titleEl && (titleEl.textContent = title);
    bodyEl && (bodyEl.innerText = body);
    archiveToggle && (archiveToggle.innerHTML = archiveIcon);
  }

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