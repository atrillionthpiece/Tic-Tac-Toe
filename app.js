let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector(".reset-btn");
let newGameBtn= document.querySelector(".new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg=document.querySelector(".msg");
let winSound = new Audio("victory.mp3");
let drawSound = new Audio("draw.mp3");
let buttonSound = new Audio("button1.mp3");
let turnO= true;
const winPatters=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame = () =>{
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click",()=>{
        buttonSound.currentTime=0;
        buttonSound.play();
        console.log("box was clicked");
        if(turnO){
            box.innerText="O";
            box.style.color = "black";
            turnO=false;
        }else {
            box.innerText = "X";
            box.style.color = "#b0413e"
            turnO= true;
        }
        box.disabled =true;

        checkWinner();
    });
});
const disbaleBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled =false;
        box.innerText="";
    }
};
const showWinner= (winner) =>{
    msg.innerText = `congrats, winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disabledBoxes();
};

const checkWinner = () =>{
    let isDraw=true;
    for(pattern of winPatters){
        
        let pos1Val =boxes[pattern[0]].innerText;
        let pos2Val =boxes[pattern[1]].innerText;
        let pos3Val =boxes[pattern[2]].innerText;
        if (pos1Val !="" && pos2Val !="" && pos3Val!=""){
            if (pos1Val === pos2Val && pos2Val === pos3Val){
                console.log("winner", pos1Val);
                showWinner(pos1Val);
                winSound.currentTime=0;
                winSound.play();
                return;
            }
        }
    };
    boxes.forEach((box)=>{
        if(box.innerText ===""){
            isDraw=false;
        }
    })
    if (isDraw){
        gameDraw();
        drawSound.currentTime=0;
        drawSound.play();
    }
};

newGameBtn.addEventListener("click", () =>{
    buttonSound.currentTime=0;
    buttonSound.play();
    resetGame();
})
resetBtn.addEventListener("click", ()=>{
    buttonSound.currentTime=0;
    buttonSound.play();
    resetGame();
});
