// Start Screen Appears when page loads
// Play Game button loads the Tic Tac Toe board and starts the game
class Game {
  constructor (player1, player2) {
    this.player1 = player1,
    this.player2 = player2,
    this.move = 0
  }
};


const body = document.querySelector('body');
const boardScreen = document.getElementById('board');
const player1Box = document.getElementById('player1');
const player2Box = document.getElementById('player2');
boardScreen.style.display = 'none';
const newDiv = document.createElement('div');
newDiv.innerHTML =
  `<div class="screen screen-start" id="start">
    <header>
      <h1>Tic Tac Toe</h1>
      <a href="#" class="button">Single Player Start</a>
      <a href="#" class="button">Two Player Start</a>
    </header>
  </div>`
;

const newDiv2 = document.createElement('div');
newDiv2.innerHTML =
  `<div class="screen screen-win" id="finish">
    <header>
      <h1>Tic Tac Toe</h1>
      <p class="message"></p>
      <a href="#" class="button">New game</a>
    </header>
  </div>`
;



body.append(newDiv);
body.append(newDiv2);
const winScreen = document.getElementById('finish');
winScreen.style.display = 'none';
const header = boardScreen.querySelector('header');
const ul = header.querySelector('ul');
const player1DivBox = document.createElement('div');
const player2DivBox = document.createElement('div');
header.insertBefore(player1DivBox, ul);
header.insertBefore(player2DivBox, ul);
player1DivBox.className = 'playBox name1';
player2DivBox.className = 'playBox name2';
const message = document.querySelector('.message');


const startScreen = document.getElementById('start');
const startBtn = startScreen.querySelectorAll('.button')[1];
const playAgainBtn = winScreen.querySelector('.button');
let game1 = {};
startBtn.addEventListener('click', (e) => {
  const player1 = prompt('Please enter Player 1\'s name');
  const player2 = prompt('Please enter Player 2\'s name');
  game1 = new Game(player1, player2);
  checkActive();
  player1DivBox.textContent = `Player 1: ${game1.player1}`;
  player2DivBox.textContent = `Player 2: ${game1.player2}`;
  startScreen.style.display = 'none';
  boardScreen.style.display = '';
});
playAgainBtn.addEventListener('click', (e) => {
  winScreen.style.display = 'none';
  startScreen.style.display = '';
  for (let i = 0; i < listItems.length; i +=1) {
    listItems[i].classList.remove('box-filled-1');
    listItems[i].classList.remove('box-filled-2');
    listItems[i].style.backgroundImage = '';
  }
  gameBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
});

const boxes = document.querySelector('.boxes');
const listItems = Array.prototype.slice.call(boxes.children);
boxes.addEventListener('mouseover', (e) => {
  if (e.target.classList.contains('box-filled-1') || e.target.classList.contains('box-filled-2')) {
  } else if (game1.move % 2 === 0){
    e.target.style.backgroundImage = "url('img/o.svg')";
  } else {
    e.target.style.backgroundImage = "url('img/x.svg')";
  }
});
boxes.addEventListener('mouseout', (e) => {
  if (e.target.classList.contains('box-filled-1') || e.target.classList.contains('box-filled-2')) {
  } else {
  e.target.style.backgroundImage = '';
  }
});
boxes.addEventListener('click', (e) => {
  if (e.target.classList.contains('box-filled-1') || e.target.classList.contains('box-filled-2')) {
  } else if (game1.move % 2 === 0) {
    e.target.style.backgroundImage = "url('img/o.svg')";
    e.target.classList.add('box-filled-1');
    const indexNum = listItems.indexOf(e.target);
    gameBoard[indexNum] = -1;
    game1.move += 1;
    checkActive();
    checkWin();
  } else {
    e.target.style.backgroundImage = "url('img/x.svg')";
    e.target.classList.add('box-filled-2');
    const indexNum = listItems.indexOf(e.target);
    gameBoard[indexNum] = 1;
    game1.move += 1;
    checkActive();
    checkWin();
  }
});

/*function terminalState () {
  if (
    gameBoard[0] === gameBoard[3] && gameBoard[0] === gameBoard[6] && gameBoard[0] !== 0 ||
    gameBoard[1] === gameBoard[4] && gameBoard[1] === gameBoard[7] && gameBoard[1] !== 0 ||
    gameBoard[2] === gameBoard[5] && gameBoard[2] === gameBoard[8] && gameBoard[2] !== 0 ||
    gameBoard[0] === gameBoard[1] && gameBoard[0] === gameBoard[2] && gameBoard[0] !== 0 ||
    gameBoard[3] === gameBoard[4] && gameBoard[3] === gameBoard[5] && gameBoard[3] !== 0 ||
    gameBoard[6] === gameBoard[7] && gameBoard[6] === gameBoard[8] && gameBoard[6] !== 0 ||
    gameBoard[0] === gameBoard[4] && gameBoard[0] === gameBoard[8] && gameBoard[0] !== 0 ||
    gameBoard[2] === gameBoard[4] && gameBoard[2] === gameBoard[6] && gameBoard[2] !== 0
  ) {
    console.log('game Over');
  }
}*/

function checkWin () {
  function checkLine (cls) {
    function checkRow (a, b, c, cls) {
      if (listItems[a].classList.contains(cls) &&
        listItems[b].classList.contains(cls) &&
        listItems[c].classList.contains(cls)
      ) {
        return true;
      }
    }
    if (checkRow(0, 1, 2, cls) || checkRow(3, 4, 5, cls) || checkRow(6, 7, 8, cls) ||
      checkRow(0, 3, 6, cls) || checkRow(1, 4, 7, cls) || checkRow(2, 5, 8, cls) ||
      checkRow(0, 4, 8, cls) || checkRow(2, 4, 6, cls)
    ) {
      return true;
    }
  }
  if (checkLine('box-filled-1')) {
    displayWin(1);
  } else if (checkLine('box-filled-2')) {
    displayWin(2);
  } else if(gameBoard.filter(box => box === 0).length === 0) {
    displayWin(0);
  }
}
function displayWin (condition) {
  boardScreen.style.display = 'none';
  winScreen.style.display = '';
  if (condition === 1) {
    winScreen.classList.add('screen-win-one');
    message.textContent = `Player 1: ${game1.player1} Wins!`
  } else if (condition === 2) {
    winScreen.classList.add('screen-win-two');
    message.textContent = `Player 2: ${game1.player2} Wins!`
  } else {
    winScreen.classList.add('screen-win-tie');
    message.textContent = `Tie Game!`
  }
}
// Game alternates between O and X
// Active player on the board is identified by highlighting either the X or O
// On mouseover, empty squares show the players X or O icon
// Cannot click on already filled squares
// Ocupied squares are filled with X or O
// Extra Credit: Player's name appears on the board Screen
// Extra Credit: There is a Player vs. Computer option

// Game ends if either player has three icons in a row, or the board is full
// Finish screen appears announcing the winner or a tie.
// New game button starts a new game with an empty board
// Extra Credit: Player's name appears if they win

let gameBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];

function checkActive () {
  if (game1.move % 2 === 0) {
    player1Box.classList.add('active');
    player2Box.classList.remove('active');
  } else {
    player2Box.classList.add('active');
    player1Box.classList.remove('active');
  }
}

// game state object
//    Whose move?
//    Game Board?
//    Determine terminal state?
