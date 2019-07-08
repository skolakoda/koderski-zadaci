const token = localStorage.getItem('x-auth-token');
console.log(token); 
if(token == null){

    /* staviti forme u komponente
    napraviti get, povuci podatke jednog usera */


const lrform = document.querySelector('#lr-form');

const regmsg = document.querySelector('#reg_msg');
const formreg = document.querySelector('.register-form');
const regname = document.querySelector('#reg_uname');
const regpass = document.querySelector('#reg_pass');
const regrpass = document.querySelector('#reg_repeat_pass');
const regemail = document.querySelector('#reg_email');
const btnreg = document.querySelector('#btn-register');
const areg = document.querySelector('#reg');

const logmsg = document.querySelector('#log_msg');
const formlog = document.querySelector('.login-form');
const logemail = document.querySelector('#log_email');
const logpass = document.querySelector('#log_pass');
const btnlog = document.querySelector('#btn-login');
const alog = document.querySelector('#log');

const url = `https://spomenici-api.herokuapp.com/korisnici`;
const urlRegister = `${url}/registracija`;
const urlLogin = `${url}/login`;

lrform.classList.remove('dontShow');

areg.addEventListener('click', () => {    
    formlog.classList.remove('dontShow');
    formreg.classList.add('dontShow');
});
alog.addEventListener('click', () => {    
    formlog.classList.add('dontShow');
    formreg.classList.remove('dontShow');    
});
function blankSpace(text){    
    const regBlankSpaces = /\s/g;
    return regBlankSpaces.test(text); 
}
function minLength(text){
    const minLength = 8;
    return text.length < minLength ? false : true;
}
function validEmail(email){    
    const regEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regEmail.test(email);
}
function matchValue(text1, text2){
    return text1 == text2 ? true : false;        
}
function validationMessage(msg,field,message){
    msg.innerHTML = '';
    msg.innerHTML = message;        
    field.select();
    field.focus();
}

btnreg.addEventListener('click', (event) => {
    event.preventDefault;         
    let email = regemail.value;
    let password = regpass.value;
    let repeatPassword = regrpass.value;   

    regmsg.innerHTML = '';

    if ( regname.value.length === 0 ||  regpass.value.length === 0 || regrpass.value.length === 0 || regemail.value.length === 0){
        regmsg.innerHTML = 'You must fill required fields!';
    }else if(blankSpace(regname.value)){        
        validationMessage(regmsg,regname,'User name can not have blank spaces!');
    }else if(!minLength(regpass.value)){           
        validationMessage(regmsg,regpass,'You must enter at least 8 character!');
    }else if(!matchValue(regpass.value, regrpass.value)){        
        validationMessage(regmsg,regrpass,'Please repeat exact password!');
    }else if(!validEmail(regemail.value)){        
        validationMessage(regmsg,regemail,'Please type valid e-mail!');
    }else{
        fetch(urlRegister, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, repeatPassword })
        })
        .then(response => response.json())
        .then(response => { 
            localStorage.setItem('x-auth-token', response.data); 
            console.log("response: ", response.data); 
            formreg.classList.add('dontShow');
            lrform.classList.add('dontShow');
        })
        .catch(error => console.error('Error:', error));        
    }
 }); 
btnlog.addEventListener('click', (event) => {
    event.preventDefault;  
    let email = logemail.value;
    let password = logpass.value;  
    logmsg.innerHTML = '';         

    if ( logemail.value.length === 0 ||  logpass.value.length === 0 ){
        logmsg.innerHTML = 'You must fill required fields!';                    
    }else if(!validEmail(logemail.value)){        
        validationMessage(logmsg,logemail,'Please type valid e-mail!');
    }else if(!minLength(logpass.value)){           
        validationMessage(logmsg,logpass,'You must enter at least 8 character!');
    }else{
        fetch(urlLogin, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        .then(response => response.json())
        .then(response => {
            localStorage.setItem('x-auth-token', response.data);            
            console.log("response: ", response.data);
            formlog.classList.add('dontShow');
            lrform.classList.add('dontShow');
        });        
     }  
 }); 

}