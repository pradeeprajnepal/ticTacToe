const x_class= "x";
const circle_class="circle";

const cellElement= document.querySelectorAll("[data-cell]");
const board= document.getElementById("board");

let circleTurn

startGame();

function startGame(){
    circleTurn=false;
    cellElement.forEach(cell=>{
        cell.addEventListener("click",handleClick,{once:true});
    })
    addHoverClass();
}

function handleClick(e){
    const cell= e.target;
    const currentClass= circleTurn? circle_class:x_class;
    //Place Mark
    placeMark(cell,currentClass);

    //check win
    //check draw
    //switch turn

    switchTurn();

    //hover effect
    addHoverClass()
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