/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, dice;

scores = [0,0];
roundScore = 0;
activePlayer = 0; 
//activePlayer = 1 for second player

document.querySelector('.dice').style.display = 'none';
//hiding dice at the beginning of the game

document.querySelector('.btn-roll').addEventListener('click', function() {
	//1. Generate random number (we need dice variable here so I took it form up there and declared it here, it will be available only in this anonymous function due to the scoping chain)
	var dice = Math.floor(Math.random() * 6) + 1;
	
	//2. Display the result
	var diceDOM = document.querySelector('.dice');
	diceDOM.style.display = 'block';
	diceDOM.src = 'dice-' + dice + '.png';
	
	//3. Update the round score but only IF generated number is not 1 
	document.querySelector('#current-' + activePlayer).textContent = dice;
	//this is setter because it sets the vaule, getter is a variable in which we store already existing value so we can print it later
	
});