import { editor } from './utils/editor.js'
import { $ } from './utils/helpers.js'
import './components/Navigacija.js'
import './components/Footer.js'
const { assert } = window.chai

let challenges = []
let currentChallengeId = '2'
const defaultMessage = 'Try your solution in code editor.'

/* FUNCTIONS */

const findChallenge = id => challenges.find(challenge => challenge.id === id)

function toggleActive (id) {
  const challengeDiv = $(`#challenge-${id}`)
  document.querySelectorAll('.active').forEach(el => el.classList.remove('active'))
  challengeDiv.classList.add('active')
}

function renderChallenge (challenge) {
  const star = '&#9733;'
  const div = document.createElement('div')
  div.id = `challenge-${challenge.id}`
  div.classList.add('challenge')
  div.innerHTML = `<p>${challenge.title}</p><span>${star.repeat(challenge.level)}</span>`
  div.addEventListener('click', () => selectChallenge(challenge.id))
  return div
}

function renderChallenges () {
  challenges.forEach(challenge => {
    const element = renderChallenge(challenge)
    $('.challenges').appendChild(element)
  })
}

function selectChallenge (id) {
  $('#message').innerHTML = defaultMessage
  currentChallengeId = id
  toggleActive(id)
  const challenge = findChallenge(id)
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
  // uzima funkciju iz editora i smesta je u globalni prostor
  window[challenge.name] = new Function(`return ${editor.getValue()}`)() // eslint-disable-line
  challenge.tests.forEach(test => {
    try {
      const testCase = eval(test.input) // izvrsava funkciju istog naziva iz JSON-a
      const output = JSON.parse(test.output)
      assert[test.method](testCase, output, test.input)
      $('#message').innerHTML += `<div class="success-msg">✓ ${test.input}</div>`
    } catch (e) {
      solved = false
      $('#message').innerHTML += `<div class="error-msg">✘ ${e.message}</div>`
    }
  })
  if (solved) {
    $('#message').innerHTML += '<div class="success-msg">Čestitamo, rešili ste zadatak!</div>'
  }
}

/* INIT */

window.fetch('../data/tasks.json')
  .then(response => response.json())
  .then(response => {
    challenges = response
    renderChallenges()
    selectChallenge(challenges[0].id)
  })

/* EVENTS */

$('#run').addEventListener('click', checkChallenge)
