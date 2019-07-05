class Navigacija extends HTMLElement {
  constructor () {
    super()
    this.innerHTML = `
      <nav>
        <a href="index.html">Home</a>
        <a href="#">My profile</a>
      </nav>
    `
  }
}

customElements.define('nasha-navigacija', Navigacija)
