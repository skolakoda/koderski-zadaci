import { urll } from '../utils/constants.js'
import { blankSpace, minLength, validEmail, matchValue, validationMessage } from '../utils/helpers.js'

function httpRegister () {
  const urlRegister = `${urll}/registracija`
  const formreg = document.querySelector('.register-form')
  const lrform = document.querySelector('#lr-form')
  const regemail = document.querySelector('#reg_email')
  const regpass = document.querySelector('#reg_pass')
  const regrpass = document.querySelector('#reg_repeat_pass')
  let email = regemail.value
  let password = regpass.value
  let repeatPassword = regrpass.value
  console.log('httpRegister')

  window.fetch(urlRegister, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, repeatPassword })
  })
    .then(response => response.json())
    .then(response => {
      window.testlocalStorage.setItem('x-auth-token', response.data)
      console.log('response: ', response.data)
      formreg.classList.add('dontShow')
      lrform.classList.add('dontShow')
    })
    .catch(error => console.error('Error:', error))
}

function handleSubmitReg (event) {
  event.preventDefault()
  const lrform = document.querySelector('#lr-form')
  const regmsg = document.querySelector('#reg_msg')
  const regname = document.querySelector('#reg_uname')
  const regpass = document.querySelector('#reg_pass')
  const regrpass = document.querySelector('#reg_repeat_pass')
  const regemail = document.querySelector('#reg_email')

  lrform.classList.remove('dontShow')
  regmsg.innerHTML = ''

  if (regname.value.length === 0 || regpass.value.length === 0 || regrpass.value.length === 0 || regemail.value.length === 0) {
    regmsg.innerHTML = 'You must fill required fields!'
  } else if (blankSpace(regname.value)) {
    validationMessage(regmsg, regname, 'User name can not have blank spaces!')
  } else if (!minLength(regpass.value)) {
    validationMessage(regmsg, regpass, 'You must enter at least 8 character!')
  } else if (!matchValue(regpass.value, regrpass.value)) {
    validationMessage(regmsg, regrpass, 'Please repeat exact password!')
  } else if (!validEmail(regemail.value)) {
    validationMessage(regmsg, regemail, 'Please type valid e-mail!')
  } else {
    httpRegister()
  }
}

class Register extends HTMLElement {
  constructor () {
    super()
    this.innerHTML = `            
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
  connectedCallback () {
    const formreg = document.querySelector('#register-form')
    formreg.addEventListener('submit', handleSubmitReg)
  }
}

customElements.define('kz-register', Register)
