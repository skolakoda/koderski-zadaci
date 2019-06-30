const allChallenges = document.querySelector(".allChallenges");

fetch("../data/tasks.json")
  .then(response => response.json())
  .then(response => {
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
  //prikazivanje teksta zadatka
}
