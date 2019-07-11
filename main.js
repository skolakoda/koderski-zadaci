import { editor } from './utils/editor.js'
import './components/Navigacija.js'
import './components/Footer.js'

const allChallenges = document.querySelector('.allChallenges')
const challengeText = document.querySelector('#challengeText')
const dugme = document.querySelector('#run')

/* FUNCTIONS */

function displayChallenge (challenges) {
  const star = '&#9733;'
  challenges.forEach(challenge => {
    let challengeDiv = document.createElement('DIV')
    challengeDiv.addEventListener('click', () => toTextarea(challengeDiv, challenges))
    challengeDiv.id = challenge.id
    challengeDiv.classList.add('challenge')
    challengeDiv.innerHTML = `<p>${challenge.title}</p><span>${star.repeat(challenge.level)}</span>`
    allChallenges.appendChild(challengeDiv)
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

function toTextarea (el, challenges) {
  addStyle(el)
  let id = el.getAttribute('id')
  const challenge = challenges.find(challenge => challenge.id === id)
  if (typeof challenge.text !== 'string') {
    const reg = new RegExp(',(?=(?:[^"]*"[^"]*")*[^"]*$)', 'g')
    challengeText.innerHTML = challenge.text.toString().replace(reg, ' ')
    return
  }
  challengeText.innerHTML = challenge.text
}

/* INIT */

window.fetch('../data/tasks.json')
  .then(response => response.json())
  .then(response => {
    displayChallenge(response)
  })

/* EVENTS */

dugme.addEventListener('click', function () {
  const editorValue = editor.getValue()
  const resenje = new Function(`return ${editorValue}`)() // eslint-disable-line
  console.log(resenje) // resenje is a function to test
})
