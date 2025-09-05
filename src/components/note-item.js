class NoteItem extends HTMLElement {
  _note;

  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  connectedCallback() {
    this.composeHTML();

    this.addEventListener("click", this.handleClick);
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.handleClick);
  }

  composeHTML() {
    const container = document.createElement("div");
    container.className = "note-item__container";
    container.innerHTML = `
    <div class="note-item__title"></div>
    <div class="note-item__body"></div>
    <div class="note-item__created-at"></div>
    `;

    this.appendChild(container);

    if (typeof this._note === "object") {
      this.updateView();
    }
  }

  updateView() {
    const titleEl = this.querySelector(".note-item__title");
    const bodyEl = this.querySelector(".note-item__body");
    const createdAtEl = this.querySelector(".note-item__created-at");

    const { title, body, createdAt } = this._note;

    const date = createdAt ? new Date(createdAt) : "";

    titleEl && (titleEl.textContent = title);
    bodyEl && (bodyEl.innerText = body);
    createdAtEl &&
      (createdAtEl.textContent = date ? date.toLocaleString() : "");
  }

  handleClick(evt) {
    evt.stopPropagation();

    let action = "default";
    if (evt.target.classList.contains("note-item__archive-toggle")) {
      action = "archive";
    } else if (evt.target.classList.contains("note-item__delete-button")) {
      action = "delete";
    }

    this.dispatchEvent(
      new CustomEvent("clicked", {
        detail: {
          action,
          data: this.note,
        },
      }),
    );
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

customElements.define("note-item", NoteItem);
