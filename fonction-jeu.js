/*******************/
/* Régles Exercice */
/*******************/
/*
- Le jeu comprend 2 joueurs sur un seul et même écran. 
- Chaque joueur possède un score temporaire (ROUND) et un score global (GLOBAL).
- À chaque tour, le joueur a son ROUND initialisé à 0 et peut lancer un dé autant de fois qu'il le souhaite. Le résultat d’un lancer est ajouté au ROUND. 
- Lors de son tour, le joueur peut décider à tout moment de:
  - Cliquer sur l’option “Hold”, qui permet d’envoyer les points du ROUND vers le GLOBAL. Ce sera alors le tour de l’autre joueur.
  - Lancer le dé. S’il obtient un 1, son score ROUND est perdu et c’est la fin de son tour.
- Le premier joueur qui atteint les 100 points sur global gagne le jeu.
*/

var scores, roundScore, activePlayer, prevDiceRoll, gamePlaying;

// Initialization Jeu
init();

document.querySelector('.btn-roll').addEventListener('click', function () {

  if (gamePlaying) {
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;
    document.getElementById('dice1').style.display = 'block';
    document.getElementById('dice2').style.display = 'block';
    document.getElementById('dice1').src = './Images/dice-' + dice1 + '.png';
    document.getElementById('dice2').src = './Images/dice-' + dice2 + '.png';
    
    if(dice1 === 6 && prevDiceRoll === 6) {
        scores[activePlayer] = 0;
        document.querySelector('#globalScorePlayer-' + activePlayer).textContent = '0';
        nextPlayer();
    } else if (dice1 !== 1 && dice2 !== 1) {
        roundScore += dice1 + dice2;
        document.querySelector('#currentScorePlayer-' + activePlayer).textContent = roundScore;
    } else {
        nextPlayer();
    }
    prevDiceRoll = dice1;
  }
});

// Code pour accumuler des points Joueur Active ('hold')
document.querySelector('.btn-hold').addEventListener('click', function () {

  if (gamePlaying) {
    scores[activePlayer] += roundScore;
    document.querySelector('#globalScorePlayer-' + activePlayer).textContent = scores[activePlayer];

    // Vérification de but à atteindre: Si 100 points ou un autre but introduit  
    var input = document.getElementById('winningScore').value;
    var winningScore;
    if(input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }

    // Vérification à chaque tour si Joueur Active a gagné, addition de champ Winner!, suppresion de class joueur active et arrãt de jeu
    if (scores[activePlayer] >= winningScore) {
      document.querySelector('#winner-'+ activePlayer).style.visibility = 'visible';
      document.querySelector('#winner-' + activePlayer).textContent = 'Winner!';

      document.getElementById('dice1').style.display = 'none';
      document.getElementById('dice2').style.display = 'none';

      document.querySelector('.player-' + activePlayer + '-box').classList.add('winner');

      document.querySelector('.player-' + activePlayer + '-box').classList.remove('active');

      gamePlaying = false;

    } else {
      nextPlayer();
    }
  }
});

// Restart jeu en cliquant sur le bouton 'New Game' 
document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  gamePlaying = true;
  scores = [0, 0, 0];
  activePlayer = 1;
  roundScore = 0;

  document.getElementById('dice1').style.display = 'none';
  document.getElementById('dice2').style.display = 'none';

  document.getElementById('globalScorePlayer-1').textContent = '0';
  document.getElementById('globalScorePlayer-2').textContent = '0';
  document.getElementById('currentScorePlayer-1').textContent = '0';
  document.getElementById('currentScorePlayer-2').textContent = '0';

  document.getElementById('winner-1').style.visibility = 'hidden';
  document.getElementById('winner-2').style.visibility = 'hidden';
  document.querySelector('.player-1-box').classList.remove('winner');
  document.querySelector('.player-2-box').classList.remove('winner');

  document.querySelector('.player-1-box').classList.remove('active');
  document.querySelector('.player-2-box').classList.remove('active');
 
  document.querySelector('.player-2-box').classList.remove('active');
  document.querySelector('.player-1-box').classList.add('active');
}

// Fonction pour changer de joueur à chaque tour
function nextPlayer() {
  activePlayer === 1 ? activePlayer = 2 : activePlayer = 1;
  roundScore = 0;

  document.getElementById('currentScorePlayer-1').textContent = '0';
  document.getElementById('currentScorePlayer-2').textContent = '0';

  document.querySelector('.player-1-box').classList.toggle('active');
  document.querySelector('.player-2-box').classList.toggle('active');

  document.getElementById('dice1').style.display = 'none';
  document.getElementById('dice2').style.display = 'none';
}