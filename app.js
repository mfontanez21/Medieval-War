// Declare variables
let playerDeck = []
let playerPlayZone = []
let computerDeck = []
let computerPlayZone = []
let warzone 
let removedCardPlayer
let removedCardComp

let gameDeck = ["d14","d12","d13","d11","d10","d09","d08","d07","d06","d05","d04","d03","d02","h14","h12","h13","h11","h10","h09","h08","h07","h06","h05","h04","h03","h02","c14","c12","c13","c11","c10","c09","c08","c07","c06","c05","c04","c03","c02","s14","s12","s13","s11","s10","s09","s08","s07","s06","s05","s04","s03","s02"]




// Cached element references \\
let deck1El = document.getElementById('deck-1')
let deck2El = document.getElementById('deck-2')
let deck3El = document.getElementById('deck-3')
let deck4El = document.getElementById('deck-4')

// // Event listeners
document.getElementById('btn').addEventListener('click', handleClickPlayer)
// document.getElementById('btn').addEventListener('click', handleClickPlayer1)



function init() {
  shuffleDeck(gameDeck)
  splitDeck(gameDeck)
}

// console.log(initDecks);


function shuffleDeck(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

shuffleDeck(gameDeck)
console.log(gameDeck);

function splitDeck(){
  shuffleDeck(gameDeck)
  playerDeck = gameDeck.slice(0, 25);
  computerDeck = gameDeck.slice(26, 51);
}
splitDeck(gameDeck)
console.log(playerDeck);
console.log(computerDeck);


function handleClickPlayer() {

	// Used to prevent error on click when no cards are left in deck 1
  if (playerDeck.length > 0) {  

	  // Randomly select number from total cards remaining
		let randIdx = Math.floor(Math.random()*playerDeck.length)

		// Assigns card with the random index to a variable   
	  let cardPicked = playerDeck.splice(randIdx, 1)[0]

	  // Adds card picked to deck 2
		playerPlayZone.push(cardPicked) 

	  // Pass card picked to render function to display
		renderPlayer1(cardPicked)
  }
  if (computerDeck.length > 0) {  

	 
		let randIdx = Math.floor(Math.random()*computerDeck.length)

		 
	  let cardPicked = computerDeck.splice(randIdx, 1)[0]

	 
		computerPlayZone.push(cardPicked) 

	  
		renderPlayer2(cardPicked)
  }
}



function renderPlayer1(cardPicked) {

  // Removes outline class when first card is picked
  if (playerPlayZone.length === 1) {  
    deck2El.classList.remove("outline")
  }

	// Remove previous picked card from deck 2 class list
  if (playerDeck.length > 1) {  
    deck1El.classList.remove(removedCardPlayer)
  }

	// Set card to be removed on next click
  removedCardPlayer = cardPicked  

	// Add current card picked to deck 2 array
  deck2El.classList.add(cardPicked)  

	// Adjust shadow when deck gets above/below halfway full
  if (playerDeck.length === 26) {  
    deck2El.classList.add("shadow");
    deck1El.classList.remove("shadow");
  }
	
	// Remove card back color and adds outline when last card is picked
  if (playerDeck.length === 0) {  
    deck1El.classList.add("outline");
    deck1El.classList.remove("back-red");
  }
}

function renderPlayer2(cardPicked) {

  // Removes outline class when first card is picked
  if (computerPlayZone.length === 1) {  
    deck3El.classList.remove("outline")
  }

  if (computerDeck.length > 1) {  
    deck4El.classList.remove(removedCardComp)
  }

  removedCardComp = cardPicked  

  deck3El.classList.add(cardPicked)  

  if (computerDeck.length === 26) {  
    deck3El.classList.add("shadow");
    deck4El.classList.remove("shadow");
  }
	
	// Remove card back color and adds outline when last card is picked
  if (computerDeck.length === 0) {  
    deck4El.classList.add("outline");
    deck4El.classList.remove("back-blue");
  }
}

function pileComparison(){
  
}