class Modal extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {

  }

  disconnectedCallback() {

  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }
  }

  render() {

  }

  updateStyles() {

  }

  template() {
    
  }
}

customElements.define("cr-modal", Modal);