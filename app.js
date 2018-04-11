/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

FEW CHANGES:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Added an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. 
3. Added another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1.

*/

var scores, roundScore, activePlayer, gamePlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
	if (gamePlaying) {
		//1. Generate random number (we need dice variable here so I took it from up there and declared it here, it will be available only in this anonymous function due to the scoping chain)
		var dice1 = Math.floor(Math.random() * 6) + 1;
		var dice2 = Math.floor(Math.random() * 6) + 1;
		
		//2. Display the result
		document.getElementById('dice-1').style.display = 'block';
		document.getElementById('dice-2').style.display = 'block';
		document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
		document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';
		
		//3. Update the round score but only IF generated number is not 1 
		if (dice1 === 6 && dice2 === 6) {
			scores[activePlayer] = 0;
			document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
			nextPlayer();
		}else if (dice1 !== 1 && dice2 !== 1) {
			//add score
			roundScore += dice1 + dice2;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
			//this is setter because it sets the vaule, getter is a variable in which we store already existing value so we can print it later
		}else {
			nextPlayer();
		}
	}
});

document.querySelector('.btn-hold').addEventListener('click', function() {
	if (gamePlaying) {
		//1. Add CURRENT score to the GLOBAL score
		scores[activePlayer] += roundScore;
		
		//2. Update UI
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
		
		var input = document.querySelector('.final-score').value;
		var winningScore;
		if(input) {
			winningScore = input;
		}else {
			winningScore = 100;
		}
		
		//3. Check if active player won the game
		if (scores[activePlayer] >= winningScore) {
			document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
			document.getElementById('dice-1').style.display = 'none';
			document.getElementById('dice-2').style.display = 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			gamePlaying = false;
		}else {
			nextPlayer();
		}
	}
});

function nextPlayer() {
	//ternary operator
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	//     IF                  THEN                     ELSE
	roundScore = 0;
	//new player is playing now so round score for him must start form 0
	
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	//all round scores must be changed to 0, new round has began
	
	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');
	//change interface of active player from one player to another
	
	document.getElementById('dice-1').style.display = 'none';
	document.getElementById('dice-2').style.display = 'none';
	//hide dice after each round
}

document.querySelector('.btn-new').addEventListener('click', init); //I don't need to use () with init function because that way function would be launched immediatley, instead of that I just said to event listener that if event happens (click on button) than and ONLY than function must me launched

function init() {
	scores = [0,0];
	roundScore = 0;
	activePlayer = 0; 
	gamePlaying = true;
	//activePlayer = 1 for second player
	
	document.getElementById('dice-1').style.display = 'none';
	document.getElementById('dice-2').style.display = 'none';
	//hiding dice image
	
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	
	//bring back names for players in case we want to start new game after one of them won, also remove all classes and add active class to Player 1
	document.getElementById('name-0').textContent = "Player 1";
	document.getElementById('name-1').textContent = "Player 2";
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
}