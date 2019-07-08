class LoginRegister extends HTMLElement {
  constructor () {
    super()
    this.innerHTML = `
            <!-- <div id="lr-form" class="login-page dontShow"> -->
                <div class="form">
                    <form id="register-form" class="register-form dontShow" action="#">
                        <p id='reg_msg' style="color: red"></p>
                        <input id="reg_uname" type="text" placeholder="user name" autocomplete="username" required>
                        <input id="reg_pass" type="password" placeholder="password" autocomplete="new-password" required>                    
                        <input id="reg_repeat_pass" type="password" placeholder="repeat password" autocomplete="new-pasword" required>
                        <input id="reg_email" type="text" placeholder="email" required>                    
                        <button id="btn-register">Create</button>
                        <p class="message">Already Registered? <a id ="reg" href="#">Login</a></p>
                    </form>                
                    <form id="login-form" class="login-form" action="#">
                        <p id='log_msg' style="color: red"></p>
                        <input id="log_email" type="text" placeholder="email" autocomplete="username" required>
                        <input id="log_pass" type="password" placeholder="password" autocomplete="current-password" required>
                        <button id="btn-login">Log in</button>
                        <p class="message">Not Registered? <a id = "log" href="#">Register</a></p>
                    </form>
                </div>
            <!-- </div> -->
        `
  }
}

customElements.define('kz-login-register', LoginRegister)
