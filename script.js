const btn_twoPlayer = document.querySelector('#twoPlayer')
const btn_computerEasy = document.querySelector('#computerEasy')
const btn_computerHard = document.querySelector('#computerHard')

btn_twoPlayer.addEventListener('click', () => {
  userInterface.mode_twoPlayer()

})

btn_computerEasy.addEventListener('click', () => {
  userInterface.mode_ComputerEasy()

})

btn_computerHard.addEventListener('click', () => {
  userInterface.mode_ComputerHard()
})

// All UI related functions
const userInterface = (() => {
  const body = document.querySelector('body')
  const test = document.querySelector('.test')
  const mainMenu = document.querySelector('.modeSelect')


  const mode_twoPlayer = () => {

    console.log('PVP')
    mainMenu.classList.add('hidden')
    gameMechanics.playerTurn()
    gameMechanics.reset()
    gameMechanics.playerTurn()
    gameMechanics.goBack()

  }

  const mode_ComputerEasy = () => {

    console.log('Easy')
    mainMenu.classList.add('hidden')
    body.style.background = 'linear-gradient(to right, #41B345 0%, #3AA23E 50%, #37973A)'
    gameMechanics.playerTurn(gameMechanics.computerTurn)
    gameMechanics.reset()
    gameMechanics.goBack()
  }

  const mode_ComputerHard = () => {

    console.log('Hard')
    body.style.background = 'linear-gradient(to right, #9F2424 0%, #8D1F1F 50%, #761B1B 100%'
    test.style.textShadow = '0 -1px 4px #FFF, 0 -2px 10px #ff0, 0 -10px 20px #ff8000, 0 -18px 40px #F00'
    mainMenu.classList.add('hidden')
    gameMechanics.goBack()
  }

  return {
    mode_twoPlayer,
    mode_ComputerEasy,
    mode_ComputerHard,
  }
})()

// All game related functions
const gameMechanics = (() => {
  const reset_button = document.querySelector('#reset')
  const back_button = document.querySelector('#backBtn')
  const game_square = document.querySelectorAll('.gameSquare')
  let game_array = [0, 1, 2, 3, 4, 5, 6, 7, 8]

  
  // Player Objects
  class Player {
    constructor(symbol) {
      this.symbol = symbol
    }
  }

  const player1_obj = new Player("X")
  const player2_obj = new Player("O")
  let activePlayer = player1_obj

/////              Game Flow                  /////
//////////////////////////////////////////////////
  
  // Player rotation
  const playerTurn = (AI_option) => {
    game_square.forEach((game_square, index) => {
      game_square.addEventListener("click", () => {
        // Prevent conflict
        if (isNaN(game_array[index]) == false) {
          // check for AI Modes
          if (AI_option == gameMechanics.computerTurn && activePlayer != player2_obj) {
            update_board('X', index)
            gameResult()
            AI_option()
          // If no active AI_option
          } if (AI_option != gameMechanics.computerTurn) {
            update_board(activePlayer.symbol, index)
            gameResult()
          }
        }
      })
    })
  }

  // 'O' Computer easy/random
  const computerTurn = () => {
    let index = Math.floor(Math.random() * 8)
    if (activePlayer == player2_obj) {

      // Check for conflict
      while (isNaN(game_array[index]) == true) {
        index = Math.floor(Math.random() * 8)
        console.log('oops')
      }
      update_board('O', index)
      gameResult()
      playerTurn(computerTurn)
    }
  }

/////    Add Symbol and Switch Players     /////
///////////////////////////////////////////////  
  
  // change active player
  const next_player = () => {
    if(activePlayer == player1_obj){
        return activePlayer = player2_obj;
        
    } else {
        return activePlayer = player1_obj;
    }
  }

  // Add symbol to array / game board -> this works
  const update_board = (symbol, index) => {
    game_array[index] = symbol
    game_square[index].innerText = symbol
  }
  
/////         End Game Conditions         /////
//////////////////////////////////////////////  
  
  // End game actions - uses tie() and winning()
  const gameResult = () => {

    if (winning()) {
      reset_button.style.color = 'orange'
    }
    else if (tie()) {
      reset_button.style.color = 'purple'
    }
    else if (tie() && winning()) {
      reset_button.style.color = 'green'
    } else {
      next_player()
    }
  }
  
  // Check for tie
  const tie = () => {
    if (game_array.every(item => isNaN(item))) {
      return true
    }
  }

  // Check for Winning combination
  const winning = () => {

    const winningPatterns = [
      [0, 1, 2], //   [1,1,1, , , , , , ]
      [3, 4, 5], //   [ , , ,1,1,1, , , ]
      [6, 7, 8], //   [ , , , , , ,1,1,1]
      [0, 3, 6], //   [1, , ,1, , ,1, , ]
      [1, 4, 7], //   [ ,1, , ,1, , ,1, ]
      [2, 5, 8], //   [ , ,1, , ,1, , ,1]
      [0, 4, 8], //   [1, , , ,1, , , ,1]
      [2, 4, 6]  //   [ , ,1, ,1, ,1, , ]
    ];

    for (let i = 0; i < winningPatterns.length; i++) {
      const [a, b, c] = winningPatterns[i];
      if (game_array[a] === game_array[b] && game_array[b] === game_array[c]) {
        return true
      }
    }
  }

/////      Reset and Back to Menu        /////
/////////////////////////////////////////////    
  
  // Reset button
  const reset = () => {
    reset_button.addEventListener('click', () => {
      activePlayer = player1_obj
      reset_button.style.color = 'white'
      playerTurn()
      for (let i = 0; i < game_square.length; i++) {
        game_square[i].innerText = ""
        game_array = [0, 1, 2, 3, 4, 5, 6, 7, 8]
      }
    })
  }

  // back button
  const goBack = () => {
    back_button.addEventListener('click', () => {
      document.location.reload()
    })
  }
  
  
  return {
    playerTurn,
    computerTurn,
    // update_board,
    // tie,
    // winning,
    reset,
    goBack,
  }
})()






