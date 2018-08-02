!function() {

  // Initial Selections
  const body = document.querySelector('body');
  const boardScreen = document.getElementById('board');
  const player1Box = document.getElementById('player1');
  const player2Box = document.getElementById('player2');
  const newDiv = document.createElement('div');
  const newDiv2 = document.createElement('div');
  const header = boardScreen.querySelector('header');
  const ul = header.querySelector('ul');
  const player1DivBox = document.createElement('div');
  const player2DivBox = document.createElement('div');
  const boxes = document.querySelector('.boxes');
  const listItems = Array.prototype.slice.call(boxes.children);

  // Initial Actions
  header.insertBefore(player1DivBox, ul);
  header.insertBefore(player2DivBox, ul);
  player1DivBox.className = 'playBox name1';
  player2DivBox.className = 'playBox name2';
  boardScreen.style.display = 'none';
  body.append(newDiv);
  body.append(newDiv2);

  // Global object
  let game1 = {};

  // Code snippets for the start screen & win screen
  newDiv.innerHTML =
    `<div class="screen screen-start" id="start">
      <header>
        <h1>Tic Tac Toe</h1>
        <a href="#" class="button">Single Player Start</a>
        <a href="#" class="button">Two Player Start</a>
      </header>
    </div>`
  ;
  newDiv2.innerHTML =
    `<div class="screen screen-win" id="finish">
      <header>
        <h1>Tic Tac Toe</h1>
        <p class="message"></p>
        <a href="#" class="button">New game</a>
      </header>
    </div>`
  ;

  // Selections after new code snippets exist
  const message = document.querySelector('.message');
  const winScreen = document.getElementById('finish');
  const startScreen = document.getElementById('start');
  const startBtnSingle = startScreen.querySelectorAll('.button')[0];
  const startBtn = startScreen.querySelectorAll('.button')[1];
  const playAgainBtn = winScreen.querySelector('.button');

  // Actions after new code snippets exist
  winScreen.style.display = 'none';

  // Object class
  class Game {
    constructor (player1, player2) {
      this.player1 = player1,
      this.player2 = player2,
      this.move = 0
      this.gameBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  };

  // This function initiates a new instance of the Game object class, sets the players
  // names, highlights the correct icon, clears and loads the proper screens.
  function newGame (player1, player2) {
    game1 = new Game(player1, player2);
    checkActive();
    player1DivBox.textContent = `Player 1: ${game1.player1}`;
    player2DivBox.textContent = `Player 2: ${game1.player2}`;
    startScreen.style.display = 'none';
    boardScreen.style.display = '';
  }

  // Single player start button calls new game with player information.
  startBtnSingle.addEventListener('click', (e) => {
    const player1 = prompt('Please enter Player 1\'s name');
    const player2 = 'Computer';
    newGame(player1, player2);
  });

  // Two player start button calls new game with player information.
  // This does not allow the second player to be named "Computer." The second
  // player name is what controls the AI actions.
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
    newGame(player1, player2);
  });

  // This event handler allows the game to be played again. It hides and loads the correct
  // screens, and clears the board of class names and styling.
  playAgainBtn.addEventListener('click', (e) => {
    winScreen.style.display = 'none';
    startScreen.style.display = '';
    for (let i = 0; i < listItems.length; i +=1) {
      listItems[i].classList.remove('box-filled-1');
      listItems[i].classList.remove('box-filled-2');
      listItems[i].style.backgroundImage = '';
    }
  });

  // This Event Handler shows the correct icon image as a background on mouseover.
  boxes.addEventListener('mouseover', (e) => {
    if (e.target.classList.contains('box-filled-1') || e.target.classList.contains('box-filled-2')) {
    } else if (game1.move % 2 === 0){
      e.target.style.backgroundImage = "url('img/o.svg')";
    } else {
      e.target.style.backgroundImage = "url('img/x.svg')";
    }
  });

  // This Event Handler clears the icon image as a background on mouseout.
  boxes.addEventListener('mouseout', (e) => {
    if (e.target.classList.contains('box-filled-1') || e.target.classList.contains('box-filled-2')) {
    } else {
    e.target.style.backgroundImage = '';
    }
  });

  // This Event Handler works when clicking each box. It does nothing if the list item contains
  // the box filled class. It calls another function to complete the syling of each list item
  // based on which player clicks. This function also syles list items based on the computer
  // selection decision.
  boxes.addEventListener('click', (e) => {
    if (e.target.classList.contains('box-filled-1') || e.target.classList.contains('box-filled-2')) {
    } else if (game1.move % 2 === 0) {
      clickHandling(0, 'o', e.target);
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
      clickHandling(1, 'x', e.target);
    }
  });

  // This function styles each list item when clicked on, populated the gameBoard Array
  // based on the index of the list item, increments the move counter, checks which player's
  // turn it is which highlights player icon at the top, and checks for a win.
  function clickHandling (mod, icon, target) {
    target.style.backgroundImage = `url('img/${icon}.svg')`;
    target.classList.add(`box-filled-${mod+1}`);
    const indexNum = listItems.indexOf(target);
    game1.gameBoard[indexNum] = 1;
    game1.move += 1;
    checkActive();
    displayWin(checkWin());
  }

  // This fuction has three parts. It checks to see if each class matches in a row,
  // based on the eight possible win row conditions, and it returns a value based on
  // a win for either 'o' or 'x', a tie, or none of those.
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

  // This function displays the win screen and player name based on the number
  // returned by the checkWin function. It also hides any previous win screens.
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

  // This function changes the class of the player icon list items based on
  // whose turn it is.
  function checkActive () {
    if (game1.move % 2 === 0) {
      player1Box.classList.add('active');
      player2Box.classList.remove('active');
    } else {
      player2Box.classList.add('active');
      player1Box.classList.remove('active');
    }
  }

  // This function is the recursive function that allows the computer to choose the optimal
  // move. It will test each possibility on each turn, switching between the computer player
  // and the player. It will return terminal state conditions, back up the stack, maximizing
  // the scores for 'x', and minimizing scores for 'o'. It will return the first best option
  // as an object.
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
}();
