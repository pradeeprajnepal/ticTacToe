const x_class= "x";
const circle_class="circle";
const winCombinations=[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const cellElement= document.querySelectorAll("[data-cell]");
const winningMessageText= document.querySelector("[data-winning-message-text]");
const winningMessage= document.getElementById("winningMessage");
const restartButton= document.getElementById("restart-button");
const board= document.getElementById("board");
let circleTurn

restartButton.addEventListener("click",startGame);

startGame();

function startGame(){
    circleTurn=false;
    cellElement.forEach(cell=>{
        cell.classList.remove(x_class);
        cell.classList.remove(circle_class);
        cell.removeEventListener("click",handleClick)
        cell.addEventListener("click",handleClick,{once:true});
        
    })
    addHoverClass();
    winningMessage.classList.remove("show");
}

function handleClick(e){
    const cell= e.target;
    const currentClass= circleTurn? circle_class:x_class;
    //Place Mark
    placeMark(cell,currentClass);

    //check win
    if(checkWin(currentClass)){
        endgame(false);
    }else if(isDraw()){//check draw
        endgame(true);
    }else{
        //switch turn
        switchTurn();
        //hover effect
        addHoverClass();
    }
    
    
}

function placeMark(cell,currentClass){
    cell.classList.add(currentClass);
};

function switchTurn(){
    circleTurn=!circleTurn;
}

function addHoverClass(){
    board.classList.remove(x_class);
    board.classList.remove(circle_class);

    if(circleTurn){
        board.classList.add(circle_class);
    }else{
        board.classList.add(x_class);
    }
}

function checkWin(currentClass){
    return winCombinations.some(combination=>{
        return combination.every(index=>{
            return cellElement[index].classList.contains(currentClass);
        })
    })
}

function endgame(draw){
    if(draw){
        winningMessageText.innerText= "Draw";
    }else{
        winningMessageText.innerText= `${circleTurn ? "O's" : "X's"} Wins!`;
    }
    winningMessage.classList.add("show");
}

function isDraw(){
    return [...cellElement].every(cell=>{
        return cell.classList.contains(x_class) || cell.classList.contains(circle_class);
    })
}