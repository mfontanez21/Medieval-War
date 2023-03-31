// Declare variables
let playerDeck = []
let computerDeck = []
let warzone 

let gameDeck = ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"]




// Cached element references \\
let deck1El = document.getElementById('deck-1')
let deck2El = document.getElementById('deck-2')
let deck3El = document.getElementById('deck-3')
let deck4El = document.getElementById('deck-4')

// // Event listeners
// document.getElementById('btn').addEventListener('click', handleClickPlayer1)
// document.getElementById('btn').addEventListener('click', handleClickPlayer1)
// // document.getElementById('btn2').addEventListener('click', handleClickPlayer2)
// // Functions



function initDecks() {
  shuffleDeck()
  splitDeck()
  
}
console.log(initDecks);

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
  console.log(gameDeck.slice(0, 25));
  console.log(gameDeck.slice(26, 51));
}
splitDeck(gameDeck)


function handleClickPlayer1() {

	// Used to prevent error on click when no cards are left in deck 1
  if (deck1.length > 0) {  

	  // Randomly select number from total cards remaining
		let randIdx = Math.floor(Math.random()*deck1.length)

		// Assigns card with the random index to a variable   
	  let cardPicked = deck1.splice(randIdx, 1)[0]

	  // Adds card picked to deck 2
		deck2.push(cardPicked) 

	  // Pass card picked to render function to display
		renderPlayer1(cardPicked)
  }
}

function handleClickPlayer2() {

	// Used to prevent error on click when no cards are left in deck 1
  if (deck4.length > 0) {  

	  // Randomly select number from total cards remaining
		let randIdx = Math.floor(Math.random()*deck1.length)

		// Assigns card with the random index to a variable   
	  let cardPicked = deck4.splice(randIdx, 1)[0]

	  // Adds card picked to deck 2
		deck3.push(cardPicked) 

	  // Pass card picked to render function to display
		renderPlayer2(cardPicked)
  }
}

function renderPlayer1(cardPicked) {

  // Removes outline class when first card is picked
  if (deck1.length === 1) {  
    deck2El.classList.remove("outline")
  }

	// Remove previous picked card from deck 2 class list
  if (deck1.length > 1) {  
    deck1El.classList.remove(cardToRemove)
  }

	// Set card to be removed on next click
  cardToRemove = cardPicked  

	// Add current card picked to deck 2 array
  deck2El.classList.add(cardPicked)  

	// Adjust shadow when deck gets above/below halfway full
  if (deck2.length === 26) {  
    deck2El.classList.add("shadow");
    deck1El.classList.remove("shadow");
  }
	
	// Remove card back color and adds outline when last card is picked
  if (deck1.length === 0) {  
    deck1El.classList.add("outline");
    deck1El.classList.remove("back-red");
  }
}

function renderPlayer2(cardPicked) {

  // Removes outline class when first card is picked
  if (deck4.length === 1) {  
    deck4El.classList.remove("outline")
  }

	// Remove previous picked card from deck 2 class list
  if (deck4.length > 1) {  
    deck4El.classList.remove(cardToRemove)
  }

	// Set card to be removed on next click
  cardToRemove = cardPicked  

	// Add current card picked to deck 2 array
  deck4El.classList.add(cardPicked)  

	// Adjust shadow when deck gets above/below halfway full
  if (deck2.length === 26) {  
    deck3El.classList.add("shadow");
    deck4El.classList.remove("shadow");
  }
	
	// Remove card back color and adds outline when last card is picked
  if (deck1.length === 0) {  
    deck4El.classList.add("outline");
    deck4El.classList.remove("back-blue");
  }
}