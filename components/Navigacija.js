class Navigacija extends HTMLElement {
  constructor() {
    super()
    this.innerHTML = `
      <nav>
        <a href="index.html">Home</a>
        <a href="myProfile.html">My profile</a>
      </nav>
    `
  }
}

customElements.define('kz-navigacija', Navigacija)