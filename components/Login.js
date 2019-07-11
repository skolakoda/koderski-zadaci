import { urll } from '../utils/constants.js'
import { minLength, validEmail, validationMessage } from '../utils/helpers.js'

function httpLogin () {
  const urlLogin = `${urll}/login`
  const logemail = document.querySelector('#log_email')
  const logpass = document.querySelector('#log_pass')
  const lrform = document.querySelector('#lr-form')
  const formlog = document.querySelector('.login-form')
  let email = logemail.value
  let password = logpass.value
  console.log('httpLogin')

  window.fetch(urlLogin, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
    .then(response => response.json())
    .then(response => {
      window.localStorage.setItem('x-auth-token', response.data)
      console.log('response: ', response.data)
      formlog.classList.add('dontShow')
      lrform.classList.add('dontShow')
    })
}

function handleSubmitLog (event) {
  event.preventDefault()
  const logmsg = document.querySelector('#log_msg')
  const logemail = document.querySelector('#log_email')
  const logpass = document.querySelector('#log_pass')

  logmsg.innerHTML = ''

  if (logemail.value.length === 0 || logpass.value.length === 0) {
    logmsg.innerHTML = 'You must fill required fields!'
  } else if (!validEmail(logemail.value)) {
    validationMessage(logmsg, logemail, 'Please type valid e-mail!')
  } else if (!minLength(logpass.value)) {
    validationMessage(logmsg, logpass, 'You must enter at least 8 character!')
  } else {
    httpLogin()
  }
}

class Login extends HTMLElement {
  constructor () {
    super()
    this.innerHTML = `
            <form id="login-form" class="login-form" action="#">
                <p id='log_msg' style="color: red"></p>
                <input id="log_email" type="text" placeholder="email" required>
                <input id="log_pass" type="password" placeholder="password" required>
                <button id="btn-login">Log in</button>
                <p class="message">Not Registered? <a id = "log" href="#">Register</a></p>
            </form>
        `
  }
  connectedCallback () {
    const formlog = document.querySelector('#login-form')
    formlog.addEventListener('submit', handleSubmitLog)
  }
}

customElements.define('kz-login', Login)
