
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