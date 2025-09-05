class ButtonGroups extends HTMLElement {
  _selectionMode = "single";
  _selectedValues = [];
  _defaultValue;
  _value;

  static observedAttributes = ["selection-mode", "value"];

  constructor() {
    super();

    this._shadow = this.attachShadow({ mode: "closed" });
    this._style = document.createElement("style");

    this._shadow.append(this._style);

    this.handleClick = this.handleClick.bind(this);
  }

  connectedCallback() {
    this.render();
    this.addEventListener("click", this.handleClick);
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.handleClick);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }

    if (name === "selection-mode") {
      this.selectionMode = newValue;
    }

    if (name === "value") {
      this._defaultValue = newValue;
    }
  }

  render() {
    this._style.textContent = `
:host {
  padding-inline: 0;
  padding-block: 0.5rem;

  display: flex;
  align-items: center;
  gap: 0.5rem;
}
    `;

    this._shadow.innerHTML += '<slot name="item"></slot>';
  }

  handleClick(evt) {
    evt.stopPropagation();
    if (evt.target.slot === "item") {
      this.select(evt.target.value);
    }
  }

  updateItems() {
    const buttons = this.querySelectorAll("button");
    buttons.forEach((btn) => {
      const selected = this._selectedValues.some(
        (value) => value === btn.value,
      );
      btn.toggleAttribute("selected", selected);
    });
  }

  select(value) {
    if (this.selectionMode === "single") {
      this._selectedValues.length = 0;
    }

    this._selectedValues.push(value);

    this.dispatchEvent(
      new CustomEvent("select", {
        detail: {
          selectedValue: value,
          values: this._selectedValues,
        },
      }),
    );

    this.updateItems();
  }

  set selectionMode(value) {
    if (value === "single" || value === "multiple") {
      this._selectionMode = value;
    } else {
      this._selectionMode = "single";
    }
  }

  get selectionMode() {
    return this._selectionMode;
  }

  get selectedValues() {
    return this._selectedValues;
  }

  set value(value) {
    this._value = value;
  }

  get value() {
    return this._value;
  }
}

customElements.define("button-groups", ButtonGroups);
