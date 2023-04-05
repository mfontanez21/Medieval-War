// Variables \\
let playerDeck = []
let playerPlayZone = []
let computerDeck = []
let computerPlayZone = []
let removedCardPlayer
let removedCardComp
let playerCaptured = []
let computerCaptured = []
let warCaptured = []
let warZone = []
const toWar = new Audio("../audio/warhorn.wav")
const backgroundMusic = new Audio("../audio/trimmedmusic.mp3")
let pScore = document.getElementById("playerScore")
let cScore = document.getElementById("computerScore")
let winMessage = document.getElementById("message")

let gameDeck = ["d14","d12","d13","d11","d10","d09","d08","d07","d06","d05","d04","d03","d02","h14","h12","h13","h11","h10","h09","h08","h07","h06","h05","h04","h03","h02","c14","c12","c13","c11","c10","c09","c08","c07","c06","c05","c04","c03","c02","s14","s12","s13","s11","s10","s09","s08","s07","s06","s05","s04","s03","s02"]


// Cached element references \\
let deck1El = document.getElementById('deck-1')
let deck2El = document.getElementById('deck-2')
let deck3El = document.getElementById('deck-3')
let deck4El = document.getElementById('deck-4')
const resetBtnEl = document.getElementById("resetBtn")
const audioBtn = document.getElementById("audioBtn")



// Event listeners
document.getElementById('btn').addEventListener('click', handleClickPlayer)
resetBtnEl.addEventListener("click", init)
audioBtn.addEventListener("click", function(evt){
  backgroundMusic.volume = .05
  backgroundMusic.play()
})



// Functions \\
init()

function init() {
  renderOnInit()
  shuffleDeck(gameDeck)
  splitDeck(gameDeck)
  playerPlayZone = []
  computerPlayZone = []
  playerCaptured = []
  computerCaptured = []
  pScore.innerText = "Enemies Slain: 0"
  cScore.innerText = "Allies Fallen: 0"
  winMessage.innerText = "Continue the Assault!"
}


function shuffleDeck(array) {
  for (let i = array.length - 1; i >= 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    array.push(array[randomIndex]);
    array.splice(randomIndex, 1);
  }
  return array;
}    

shuffleDeck(gameDeck)

function splitDeck(){
  playerDeck = gameDeck.slice(0, 26);
  computerDeck = gameDeck.slice(26, 52);
}
splitDeck(gameDeck)

function handleClickPlayer() {
  
  if (playerDeck.length > 0) {  
		let randIdx = Math.floor(Math.random()*playerDeck.length)
	  let cardPicked = playerDeck.splice(randIdx, 1)[0]
		playerPlayZone.push(cardPicked) 
		renderPlayer1(cardPicked)

    if (computerDeck.length > 0) {  
      let randIdx = Math.floor(Math.random()*computerDeck.length)
      let compCardPicked = computerDeck.splice(randIdx, 1)[0]
      computerPlayZone.push(compCardPicked) 
      renderPlayer2(compCardPicked)
      if (cardPicked.slice(1) > compCardPicked.slice(1)){
        deck2El.classList.add("won")
        deck3El.classList.remove("won")
        playerCaptured.push(cardPicked)
        playerCaptured.push(compCardPicked)
      } else if (cardPicked.slice(1) < compCardPicked.slice(1)) {
        deck3El.classList.add("won")
        deck2El.classList.remove("won")
        computerCaptured.push(compCardPicked)
        computerCaptured.push(cardPicked)

      } else {
        goToWar()
        computerPlayZone = []
        playerPlayZone = []
      }
    }
  }
  updateScore()
	if (playerDeck.length === 0)
  checkWinner()
} 
    
function renderPlayer1(cardPicked) {
  
  if (playerPlayZone.length === 1) {  
    deck2El.classList.remove("outline")
  }

  if (playerDeck.length >= 0) {  
    deck2El.classList.remove(removedCardPlayer)
  }

  removedCardPlayer = cardPicked  
  
  deck2El.classList.add(cardPicked)  

  if (playerDeck.length === 13) {  
    deck2El.classList.add("shadow");
    deck1El.classList.remove("shadow");
  }
  if (playerDeck.length === 0) {  
    deck1El.classList.add("outline");
    deck1El.classList.remove("back-red");

  if (playerPlayZone.length === 0){
    deck2El.classList.add("outline")
  }
}
}

function renderPlayer2(compCardPicked) {
  
  if (computerPlayZone.length === 1) {  
    deck3El.classList.remove("outline")
  }

  if (playerDeck.length >= 0) {  
    deck3El.classList.remove(removedCardComp)
  }

  removedCardComp = compCardPicked  

  deck3El.classList.add(compCardPicked)  

  if (computerDeck.length === 13) {  
    deck3El.classList.add("shadow");
    deck4El.classList.remove("shadow");
  }
	
  if (computerDeck.length === 0) {  
    deck4El.classList.add("outline");
    deck4El.classList.remove("back-blue");
  }
}

function renderOnInit(){
  deck1El.className = "card xlarge back-red shadow"
  deck2El.className = "card xlarge outline"
  deck3El.className = "card xlarge outline"
  deck4El.className = "card xlarge back-blue shadow"
}

function goToWar(){
	if(playerDeck < 4 || computerDeck< 4){
    if(playerDeck < 4) {
      console.log(playerDeck);
    }
  }
	for (let i = 0; i < length; i++) {
		warZone.push(playerDeck[0]);
    playerDeck.shift();
		warZone.push(computerDeck[0]);
		computerDeck.shift();
    console.log("this is the warzone", warZone);
  }
    compareWar(playerDeck[0], computerDeck[0]);
}


function compareWar(player,comp){
  toWar
  if((player.slice(1)) > (comp.slice(1))){
    console.log("Player card", player)
    console.log("Computer card", comp);
    console.log("WIN! Your force CRUSHES the enemy battalion");
    playerCaptured.push(player,comp)
    playerCaptured.push(...warZone)
    playerCaptured.push(computerPlayZone[0], playerPlayZone[0])
    console.log("Player Points", playerCaptured);
    playerDeck.shift()
    computerDeck.shift()
    warZone = []
    console.log(warZone);
    
  } else if ((player.slice(1)) < (comp.slice(1))) {
    console.log("LOSS! Your forces have been overrun")
    console.log("Player card", player)
    console.log("Computer card", comp);
    computerCaptured.push(player, comp)
    computerCaptured.push(...warZone)
    computerCaptured.push(computerPlayZone[0], playerPlayZone[0])
    console.log("Computer Win Pile", computerCaptured);
    playerDeck.shift()
    computerDeck.shift()
    warZone = []
    console.log(warZone);
  }

  else if ((player.slice(1)) === (comp.slice(1))){
    playerCaptured.push(warZone[0,1,2], player)
    computerCaptured.push(warZone[3,4,5], comp)
    playerDeck.shift()
    computerDeck.shift()
    warZone = []
    console.log("DRAW! Your soldiers live to fight another day");
  }
}

function checkWinner() {
  console.log("Player Points", playerCaptured.length)
  console.log("Computer Points", computerCaptured.length)
  if (playerCaptured.length > computerCaptured.length){
    winMessage.innerText = "You win! The winds of war blow in your favor"
  } else if (playerCaptured.length < computerCaptured.length) {
    winMessage.innerText = "You lose! The enemy inches closer to total victory"
  } else {
    winMessage.innerText = "Stalemate! Reassess your plan of attack";
  }
}

function playAudio () {
  let mySound = new Audio('backgroundmusic.mp3');
mySound.play()
console.log("Play Music");
}


function updateScore() {
  pScore.innerText = ("Enemies Slain: ") + playerCaptured.length
  cScore.innerText = ("Allies Fallen: ") + computerCaptured.length
}


