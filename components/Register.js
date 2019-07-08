class Register extends HTMLElement {
    constructor(){
        super()
        this.innerHTML=`            
            <form id="register-form" class="register-form dontShow" action="#">
                <p id='reg_msg' style="color: red"></p>
                <input id="reg_uname" type="text" placeholder="user name" required>
                <input id="reg_pass" type="password" placeholder="password" required>                    
                <input id="reg_repeat_pass" type="password" placeholder="repeat password" required>
                <input id="reg_email" type="text" placeholder="email" required>                    
                <button id="btn-register">Create</button>
                <p class="message">Already Registered? <a id ="reg" href="#">Login</a></p>
            </form>
        `
    }
}

customElements.define('kz-register', Register)