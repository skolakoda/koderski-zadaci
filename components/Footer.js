class Footer extends HTMLElement {
    constructor() {
        super()
        this.innerHTML=`
        <div>
            <p>Copyright © 2019 {SK}</p>
        </div>
        `
    }
}

customElements.define('kz-footer', Footer)