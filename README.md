# Tic-Tac-Toe Web App

Play a live demo here [Tic-Tac-Toe](https://drew-schmidt.github.io/TicTacToe/)

This is a Tic-Tac-Toe game that can be played in 2 player mode or against the computer. The computer has two difficulty options: easy (random selection) and hard (under construction). The game is implemented using HTML, CSS and JavaScript.

## How to Play
1. Start by selecting your game mode: 2 player or against the computer
2. Take turns marking the board with X or O.
3. The first player to mark three squares in a row wins.

## Code Explanation
The game has two main components: user interface and game mechanics. The user interface handles all UI related functions such as hiding/displaying the main menu and changing the background color. The game mechanics handle all game related functions such as player rotation, computer turns, game result determination, etc.

The code uses event listeners to trigger different functions based on which button the user clicks. For example, when the 2 player button is clicked, the `mode_twoPlayer` function is called which starts the 2 player mode of the game.

In the game mechanics component, the code uses object-oriented programming to create player objects and keep track of the active player. The code also includes functions such as `playerTurn`, `computerTurn`, and `gameResult` that are crucial for the game flow.

## Future Improvements
- Add a hard mode for the computer that uses minimax algorithm for optimal moves.
- Add a score system to keep track of the wins and losses.
- Implement a more intuitive UI for the game.



