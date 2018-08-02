
class Game {
  constructor (player1, player2) {
    this.player1 = player1,
    this.player2 = player2,
    this.move = 0
    this.gameBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0]
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
const startBtnSingle = startScreen.querySelectorAll('.button')[0];
const startBtn = startScreen.querySelectorAll('.button')[1];
const playAgainBtn = winScreen.querySelector('.button');
let game1 = {};
startBtnSingle.addEventListener('click', (e) => {
  const player1 = prompt('Please enter Player 1\'s name');
  const player2 = 'Computer';
  game1 = new Game(player1, player2);
  checkActive();
  player1DivBox.textContent = `Player 1: ${game1.player1}`;
  player2DivBox.textContent = `Player 2: ${game1.player2}`;
  startScreen.style.display = 'none';
  boardScreen.style.display = '';
});
startBtn.addEventListener('click', (e) => {
  const player1 = prompt('Please enter Player 1\'s name');
  let player2 = '';
  let counter = 0;
  do {
    counter += 1;
    if (counter > 1) {
      player2 = prompt('"Computer" is an invalid name. Please enter Player 2\'s name');
    } else {
    player2 = prompt('Please enter Player 2\'s name');
    }
  } while (player2 === 'Computer');
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
    game1.gameBoard[indexNum] = 1;
    game1.move += 1;
    checkActive();
    displayWin(checkWin());
    if (game1.player2 === 'Computer' && game1.gameBoard.filter(box => box === 0).length !== 0) {
      const indexMove = minimax(game1.gameBoard, 1).index;
      listItems[indexMove].style.backgroundImage = "url('img/x.svg')";
      listItems[indexMove].classList.add('box-filled-2');
      game1.gameBoard[indexMove] = 1;
      game1.move += 1;
      checkActive();
      displayWin(checkWin());
    }
  } else {
    e.target.style.backgroundImage = "url('img/x.svg')";
    e.target.classList.add('box-filled-2');
    const indexNum = listItems.indexOf(e.target);
    game1.gameBoard[indexNum] = 1;
    game1.move += 1;
    checkActive();
    displayWin(checkWin());
  }
});

function clickHandling (target, index) {
  if (game1.move % 2 === 0) {
    target.style.backgroundImage = "url('img/o.svg')";
    target.classList.add('box-filled-1');
    game1.gameBoard[index] = 1;
    return checkWin();
  } else {
    target.style.backgroundImage = "url('img/x.svg')";
    target.classList.add('box-filled-2');
    game1.gameBoard[index] = 1;
    return checkWin();
  }
}


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
    return 1;
  } else if (checkLine('box-filled-2')) {
    return -1;
  } else if(game1.gameBoard.filter(box => box === 0).length === 0) {
    return 0;
  } else {
    return 2;
  }
}
function displayWin (condition) {
  if (condition < 2) {
    boardScreen.style.display = 'none';
    winScreen.style.display = '';
    winScreen.classList.remove('screen-win-one');
    winScreen.classList.remove('screen-win-two');
    winScreen.classList.remove('screen-win-tie');
    if (condition === 1) {
      winScreen.classList.add('screen-win-one');
      message.textContent = `Player 1: ${game1.player1} Wins!`
    } else if (condition === -1) {
      winScreen.classList.add('screen-win-two');
      message.textContent = `Player 2: ${game1.player2} Wins!`
    } else {
      winScreen.classList.add('screen-win-tie');
      message.textContent = `Tie Game!`
    }
  }
}

function checkActive () {
  if (game1.move % 2 === 0) {
    player1Box.classList.add('active');
    player2Box.classList.remove('active');
  } else {
    player2Box.classList.add('active');
    player1Box.classList.remove('active');
  }
}

function minimax (board, player) {
  const openSpaces = [];
  for (let i = 0; i < board.length; i += 1) {
    if (board[i] === 0) {
      openSpaces.push(i);
    }
  }
  if (checkWin() === 1) {
    return {score: -10};
  } else if (checkWin() === -1) {
    return {score: 10};
  } else if (checkWin() === 0) {
    return {score: 0};
  }
  let moves = [];
  for (let i = 0; i < openSpaces.length; i += 1) {
    let move = {};
    move.index = openSpaces[i];
    if (player === 0) {
      listItems[openSpaces[i]].style.backgroundImage = "url('img/o.svg')";
      listItems[openSpaces[i]].classList.add('box-filled-1');
    } else {
      listItems[openSpaces[i]].style.backgroundImage = "url('img/x.svg')";
      listItems[openSpaces[i]].classList.add('box-filled-2');
    }
    board[openSpaces[i]] = 1;
    if (player === 1) {
      let result = minimax(board, 0);
      move.score = result.score;
    } else {
      let result = minimax(board, 1);
      move.score = result.score;
    }
    listItems[openSpaces[i]].style.backgroundImage = "";
    listItems[openSpaces[i]].classList.remove('box-filled-1');
    listItems[openSpaces[i]].classList.remove('box-filled-2');
    board[openSpaces[i]] = 0;
    moves.push(move);
  }
  let bestMove;
  if (player === 1) {
    let bestScore = -100;
    for (let i = 0; i < moves.length; i += 1) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    let bestScore = 100;
    for (let i = 0; i < moves.length; i += 1) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }
  return moves[bestMove];
}
  /*const gameBoardCopy = game1.gameBoard;
  const gameMoveCopy = game1.move;
  const whoseTurn = game1.move % 2;
  const newMoveList = [];
  function performLoop () {
    let bestMove = 0;
    let bestScore = -10;
    const openSpaces = [];
    for (let i = 0; i < game1.gameBoard.length; i += 1) {
      if (game1.gameBoard[i] === 0) {
        openSpaces.push(i);
      }
    }
    for (let i = 0; i < openSpaces.length; i += 1) {
      const winNum = clickHandling(listItems[i], i);
      if (winNum < 2) {
        const newScore = scorePush(winNum, whoseTurn);
        if (newScore > bestScore) {
          bestScore = newScore;
          newMoveList.push(openSpaces[i]);
          bestMove = newMoveList.pop();
          newMoveList = [];
        }
      } else {
        newMoveList.push(openSpaces[i]);
        game1.move += 1;
        performLoop();
      }
    }
    count = 0;
    game1.gameBoard = gameBoardCopy;
    game1.move = gameMoveCopy;
    if (whoseTurn === 0) {
      listItems[bestMove].style.backgroundImage = "url('img/o.svg')";
      listItems[bestMove].classList.add('box-filled-1');
      game1.gameBoard[bestMove] = 1;
      game1.move += 1;
      checkActive();
      displayWin(checkWin());
    } else {
      listItems[bestMove].style.backgroundImage = "url('img/x.svg')";
      listItems[bestMove].classList.add('box-filled-2');
      game1.gameBoard[bestMove] = 1;
      game1.move += 1;
      checkActive();
      displayWin(checkWin());
    }
  }
  performLoop();
}*/

function scorePush (number, turn) {
  if (turn === 0) {
    if (number === 1) {
      return 1;
    } else if (number === 0) {
      return 0;
    } else if (number === -1) {
      return -1;
    }
  } else if (turn === 1) {
    if (number === 1) {
      return -1;
    } else if (number === 0) {
      return 0;
    } else if (number === -1) {
      return 1;
    }
  }
}
