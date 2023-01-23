const Gameboard = (() => {  
    const render = () => {
        const board = ['x','x','x','x','x','x','x','x','x'];
        const cards = document.querySelectorAll('.card');
        for (let i = 0; i < board.length; i++) {
            cards[i].innerHTML = board[i];
        }
    };
    return { render };
    })();


const Players = {

}

const GameControl = {

}

