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

    if (name === "select-mode") {
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

    const itemButtons = this._shadow.querySelectorAll("::slotted(button)");
    itemButtons.forEach((item) => {
      item.classList.toggle("button-groups__item", true);
      const selected = this._defaultValue.includes(item.value);
      item.toggleAttribute("selected", selected);
    });
  }

  handleClick(evt) {
    evt.stopPropagation();
    if (evt.target.classList.contains("button-groups__item")) {
      if (this.selectionMode === "single") {
        this._selectedValues.length = 0;
      }

      const selectedValue = evt.target.value;

      this._selectedValues.push(selectedValue);
      console.log(`[button groups] item click -> value: ${selectedValue}`);

      this.dispatchEvent(
        new CustomEvent("select", {
          detail: {
            selectedValue,
            values: this._selectedValues,
          },
        }),
      );
    }
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

  set value(value) {
    this._value = value;
  }

  get value() {
    return this._value;
  }
}

customElements.define("button-groups", ButtonGroups);
