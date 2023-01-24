const Gameboard = (() => { 
    const cards = document.querySelectorAll('.card');
    const render = (array) => {
        for (let i = 0; i < array.length; i++) {
            cards[i].innerHTML = array[i];
        }
    };
    const setBoardListeners = () => {
        for (let i = 0; i < cards.length; i++) {
            cards[i].addEventListener("click", handleClick);
        }
        const start = document.querySelector('button');
        start.addEventListener("click", GameControl.startGame);
    };
    const handleClick = (event) => {
        let clickedBox = event.target.id;
        player1.makeMove(clickedBox);
    };
    return { render, setBoardListeners };
    })();

const GameControl = (() => {
    let gameOn = false;
    let playerTurn = 'p1';
    let movesArray =   ['-','-','-','-','-','-','-','-','-'];
    const startGame = () => {
        gameOn = true;
        clearMovesArray();
    };
    const passTurn = () => {
        (playerTurn === 'p1') ? (playerTurn = 'p2') : (playerTurn = 'p1');
    };
    const checkTurn = () => playerTurn;
    const clearMovesArray = () => {
         movesArray = ['-','-','-','-','-','-','-','-','-']};
    const updateArray = (markPosition, mark) => {
        if (gameOn) {
            if (movesArray[markPosition] === '-') {
                movesArray.splice(markPosition, 1, mark)
                Gameboard.render(movesArray);
                checkForWin(playerTurn);
                passTurn();
            }
        }
    };
    const checkForWin = (player) => {
        let ltrToReplace = ( (player === 'p1') ? 'x' : 'o');
        let compStr = movesArray.join("").replaceAll(ltrToReplace, 'a');
        console.log(compStr);
        ///check string against win patterns
        if ( 
            (/a..a..a../).test(compStr)|
            (/.a..a..a./).test(compStr)|
            (/..a..a..a/).test(compStr)|
            (/aaa....../).test(compStr)|
            (/...aaa.../).test(compStr)|
            (/......aaa/).test(compStr)|
            (/a...a...a/).test(compStr)|
            (/..a.a.a../).test(compStr))
            {
                return win();
            }
        ///check for tie 
        if (!(movesArray.includes('-', 0))) {
            return tie();
        }
    };
    const gameEndDisplay = document.querySelector('.game-end-message');
    const win = (player) => {
        gameOn = false;
        gameEndDisplay.innerHTML = `${player} wins!`;
    };
    const tie = () => {
        gameOn = false;
        gameEndDisplay.innerHTML = 'Tie game';
    };
    return { updateArray, checkTurn, startGame };
})();

const Players = () => {
    const makeMove = (clickedBox) => {
        let mark;
        let player = GameControl.checkTurn();
        let markPosition = parseInt(clickedBox);
        (player === 'p1') ? (mark = 'x') : (mark = 'o');
        GameControl.updateArray(markPosition, mark);
    };
    return { makeMove };
};

Gameboard.setBoardListeners();
const player1 = Players();
