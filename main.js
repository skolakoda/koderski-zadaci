import { editor } from './utils/editor.js'
import { $ } from './utils/helpers.js'
import './components/Navigacija.js'
import './components/Footer.js'
const { assert, expect } = window.chai

let challenges = []
let currentChallengeId = '2'

/* FUNCTIONS */

const findChallenge = id => challenges.find(challenge => challenge.id === id)

function displayChallenge () {
  const star = '&#9733;'
  challenges.forEach(challenge => {
    const element = document.createElement('div')
    element.addEventListener('click', () => selectChallenge(element))
    element.id = challenge.id
    element.classList.add('challenge')
    element.innerHTML = `<p>${challenge.title}</p><span>${star.repeat(challenge.level)}</span>`
    $('.challenges').appendChild(element)
  })
}

function toggleActive (challengeDiv) {
  document.querySelectorAll('.active').forEach(activeDiv => {
    activeDiv.classList.remove('active')
  })
  challengeDiv.classList.add('active')
}

function selectChallenge (element) {
  $('#message').innerHTML = ''
  currentChallengeId = element.id
  toggleActive(element)
  const challenge = findChallenge(currentChallengeId)
  editor.setValue(challenge.body)

  if (typeof challenge.text !== 'string') {
    const reg = new RegExp(',(?=(?:[^"]*"[^"]*")*[^"]*$)', 'g')
    $('#challengeText').innerHTML = challenge.text.toString().replace(reg, ' ')
    return
  }
  $('#challengeText').innerHTML = challenge.text
}

function checkChallenge () {
  $('#message').innerHTML = ''
  let solved = true
  const challenge = findChallenge(currentChallengeId)
  // uzima funkciju iz editora
  window[challenge.name] = new Function(`return ${editor.getValue()}`)() // eslint-disable-line
  challenge.tests.forEach((test, i) => {
    try {
      const testCase = eval(test.input) // izvrsava zadatu funkciju iz JSON-a
      const output = JSON.parse(test.output)
      assert[test.method](testCase, output, test.input)
    } catch (e) {
      solved = false
      $('#message').innerHTML += '<div class="error-msg">' + e.message + '</div>'
    }
  })
  if (solved) {
    $('#message').innerHTML = '<div class="success-msg">Čestitamo, rešili ste zadatak!</div>'
  }
}

/* INIT */

window.fetch('../data/tasks.json')
  .then(response => response.json())
  .then(response => {
    challenges = response
    displayChallenge()
  })

/* EVENTS */

$('#run').addEventListener('click', checkChallenge)
