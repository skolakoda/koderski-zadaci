const allChallenges = document.querySelector('.allChallenges');
const challengeText = document.querySelector('#challengeText');
let challengeArray;

fetch("../data/tasks.json")
  .then(response => response.json())
  .then(response => {
    challengeArray = response;
    displayChallenge(response);
  });

function displayChallenge(challengeArray) {
  const star = "&#9733;";
  challengeArray.forEach(challenge => {
    let challengeDiv = `<div onclick="toTextarea(this)" id="${
      challenge.id
    }" class="challenge">
         <p>${challenge.title}</p><span>${star.repeat(challenge.level)}</span>
       </div>`;
    allChallenges.innerHTML += challengeDiv;
  });
}

function addStyle(challengeDiv) {
  if (document.querySelectorAll(".active")) {
    document.querySelectorAll(".active").forEach(activeDiv => {
      activeDiv.classList.remove("active");
    });
  }
  challengeDiv.classList.add("active");
}

function toTextarea(e) {
  addStyle(e);
  let id = e.getAttribute("id");
  challengeArray.forEach(challenge => {
    if (challenge.id == id) {
      //in case of json text property spreads on more than 1 line
      if (typeof challenge.text !== "string") {
        const reg = new RegExp(',(?=(?:[^"]*"[^"]*")*[^"]*$)', "g");
        challengeText.innerHTML = challenge.text.toString().replace(reg, " ");
        return;
      }
      challengeText.innerHTML = challenge.text;
    }
  });
}
