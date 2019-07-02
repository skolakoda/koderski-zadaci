const log = document.getElementById('log');
const reg = document.getElementById('reg');
const register = document.querySelector('#register-form');
const login = document.querySelector('#login-form');

reg.addEventListener('click', () => {
    console.log("click reg");
    login.classList.remove('dontShow');
    register.classList.add('dontShow');
});
log.addEventListener('click', () => {
    console.log("clik log");
    login.classList.add('dontShow');
    register.classList.remove('dontShow');    
})
