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

/* INIT */

window.fetch('../data/tasks.json')
  .then(response => response.json())
  .then(response => {
    challenges = response
    displayChallenge()
  })

/* EVENTS */

$('#run').addEventListener('click', function () {
  // mora naziv solution zbog JSON-a
  const solution = new Function(`return ${editor.getValue()}`)() // eslint-disable-line
  const challenge = findChallenge(currentChallengeId)
  let solved = true
  challenge.tests.forEach((test, i) => {
    try {
      const result = eval(test.input) // izvrsava solution funkciju iz JSON-a
      const output = JSON.parse(test.output)
      assert[test.method](result, output, 'Solution is not correct')
    } catch (e) {
      solved = false
      console.log(e.message)
    }
  })
  const message = solved ? 'Cestitamo, resili ste zadatak!' : 'Resenje nije ispravno'
  $('#message').innerHTML = message
})
