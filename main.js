import './components/Navigacija.js'
import './components/Footer.js'

const allChallenges = document.querySelector('.allChallenges')
const challengeText = document.querySelector('#challengeText')
let challengeArray

window.fetch('../data/tasks.json')
  .then(response => response.json())
  .then(response => {
    challengeArray = response
    displayChallenge(response)
  })

function displayChallenge (challengeArray) {
  const star = '&#9733;'
  challengeArray.forEach(challenge => {
    // TODO: mora da se kreira DOM element pa da se doda dogadjaj
    // ne moze unutar stringa jer funkcija vise nije u globalnom prostoru
    let challengeDiv = `<div onclick="toTextarea(this)" id="${
      challenge.id
    }" class="challenge">
         <p>${challenge.title}</p><span>${star.repeat(challenge.level)}</span>
       </div>`
    allChallenges.innerHTML += challengeDiv
  })
}

function addStyle (challengeDiv) {
  if (document.querySelectorAll('.active')) {
    document.querySelectorAll('.active').forEach(activeDiv => {
      activeDiv.classList.remove('active')
    })
  }
  challengeDiv.classList.add('active')
}

function toTextarea (e) {
  addStyle(e)
  let id = e.getAttribute('id')
  challengeArray.forEach(challenge => {
    if (challenge.id == id) {
      // in case of json text property spreads on more than 1 line
      if (typeof challenge.text !== 'string') {
        const reg = new RegExp(',(?=(?:[^"]*"[^"]*")*[^"]*$)', 'g')
        challengeText.innerHTML = challenge.text.toString().replace(reg, ' ')
        return
      }
      challengeText.innerHTML = challenge.text
    }
  })
}

const kzEditor = document.querySelector('#kzeditor')
const editor = CodeMirror.fromTextArea(
  kzEditor, {
    mode: 'javascript',
    theme: 'nord',
    lineNumbers: true
  })

const dugme = document.querySelector('#run')
dugme.addEventListener('click', function () {
  const fromEditor = editor.getValue()
  const resenje = new Function(`return ${fromEditor}`)()
  console.log(resenje) // resenje is a function to test
})
