import { editor } from './utils/editor.js'
import './components/Navigacija.js'
import './components/Footer.js'

const sidebar = document.querySelector('.challenges')
const challengeText = document.querySelector('#challengeText')
const runButton = document.querySelector('#run')

let challenges = []

/* FUNCTIONS */

function displayChallenge () {
  const star = '&#9733;'
  challenges.forEach(challenge => {
    const element = document.createElement('div')
    element.addEventListener('click', () => selectChallenge(element))
    element.id = challenge.id
    element.classList.add('challenge')
    element.innerHTML = `<p>${challenge.title}</p><span>${star.repeat(challenge.level)}</span>`
    sidebar.appendChild(element)
  })
}

function toggleActive (challengeDiv) {
  document.querySelectorAll('.active').forEach(activeDiv => {
    activeDiv.classList.remove('active')
  })
  challengeDiv.classList.add('active')
}

function selectChallenge (element) {
  toggleActive(element)
  const challenge = challenges.find(challenge => challenge.id === element.id)
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
    challenges = response
    displayChallenge()
  })

/* EVENTS */

runButton.addEventListener('click', function () {
  const editorValue = editor.getValue()
  // solution is a function to test
  const solution = new Function(`return ${editorValue}`)() // eslint-disable-line
  const result = solution('The quick brown fox jumped over the lazy dog')
  console.log(result === 6)
})
