class Footer extends HTMLElement {
  constructor () {
    super()
    this.innerHTML = `
        <footer>
            <p>Copyright © 2019 { Škola koda }</p>
        </footer>
        `
  }
}

customElements.define('nash-footer', Footer)
