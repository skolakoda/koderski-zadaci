class Editor extends HTMLElement {
  constructor() {
    super()
    this.innerHTML = `
      Editor komponenta
      <div>
        <textarea></textarea>
      </div>

      <button>Proveri</button>
    `
  }

  connectedCallback() {
    // ovde mozemo koristiti selektor
    // dodati dogadjaj na dugme
  }

  proveriZadatak() {
    // procita sadrzaj editora
    // evaluirati sadrzaj editora (eval)
    // pozvati testove za funkciju iz editora
  }
}

customElements.define('kz-editor', Editor)