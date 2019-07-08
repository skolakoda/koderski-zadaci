class Login extends HTMLElement {
    constructor() {
        super()
        this.innerHTML=`
            <form id="login-form" class="login-form" action="#">
                <p id='log_msg' style="color: red"></p>
                <input id="log_email" type="text" placeholder="email" required>
                <input id="log_pass" type="password" placeholder="password" required>
                <button id="btn-login">Log in</button>
                <p class="message">Not Registered? <a id = "log" href="#">Register</a></p>
            </form>
        `
    }
}

customElements.define('kz-login', Login)