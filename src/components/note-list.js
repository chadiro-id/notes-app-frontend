class NoteList extends HTMLElement {
  _gutter = "16px";

  static observedAttributes = ["gutter"];

  constructor() {
    super();

    this._shadow = this.attachShadow({ mode: "closed" });

    this._mutationObserver = null;
  }

  connectedCallback() {
    this.render();
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
    if (name === "gutter") {
      this.gutter = newValue;
    }
    this.updateStyle();
  }

  render() {
    this._shadow.innerHTML = "";

    const styleContainer = document.createElement("style");
    styleContainer.textContent = this.composeStyle();

    const viewContainer = document.createElement("div");
    viewContainer.className = "content-container";
    viewContainer.innerHTML = this.composeHTML();

    this._shadow.append(styleContainer, viewContainer);
  }

  composeStyle() {
    const style = `
    .content-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      grid-auto-rows: 180px;
      grid-auto-flow: row dense;
      gap: ${this.gutter};
    }
    `;
    
    return style;
  }

  composeHTML() {
    return "<slot name=\"list-item\"></slot>";
  }

  setupMutationObserver() {
    const config = { childList: true, subtree: false };

    this._mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach((node) => {
            if (
              node.nodeType === Node.ELEMENT_NODE &&
              node.slot === "list-item"
            ) {
              this.setupItem(node);
            }
          });

          mutation.removedNodes.forEach((node) => {
            if (
              node.nodeType === Node.ELEMENT_NODE &&
              node.slot === "list-item"
            ) {
              this.cleanupItem(node);
            }
          });

        }
      });
    });

    this._mutationObserver.observe(this, config);
  }

  setupItem(node) {
    this.dispatchEvent(
      new CustomEvent("itemAdded", {
        detail: {
          node,
        },
      }),
    );
  }

  cleanupItem(node) {
    this.dispatchEvent(
      new CustomEvent("itemRemoved", {
        detail: {
          node,
        },
      }),
    );
  }

  clearItems() {
    this.innerHTML = "";
  }

  set gutter(value) {
    this._gutter = value;
  }

  get gutter() {
    return this._gutter;
  }
}

customElements.define("note-list", NoteList);
