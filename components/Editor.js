class Editor extends HTMLElement {
  constructor () {
    super()
    this.innerHTML = `
      Editor komponenta
      <div>
        <textarea></textarea>
      </div>

      <button class='btn'>Proveri</button>
    `
  }

  connectedCallback () {
    // ovde mozemo koristiti selektor
    const btn = document.querySelector('.btn')
    // dodati dogadjaj na dugme
    btn.addEventListener('click', this.proveriZadatak)
  }

  proveriZadatak () {
    alert('Provera zadatka...')
    // procita sadrzaj editora
    // evaluirati sadrzaj editora (eval)
    // pozvati testove za funkciju iz editora
  }
}

customElements.define('kz-editor', Editor)
