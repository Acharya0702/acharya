const playBoard=document.querySelector(".play-board");
const scoreElement=document.querySelector(".score");
const highscoreElement=document.querySelector(".high-score");
const controls=document.querySelectorAll(".controls i");
let gameOver=false;
let foodX, foodY;
let snakeX=5, snakeY=10;
let snakeBody=[];
let velocityX=0, velocityY=0;
let setIntervalId;
let score=0;
let highScore=localStorage.getItem("HighScore")||0;
highscoreElement.innerText=`High Score:${highScore}`;
document.getElementById('mySelect').addEventListener('keydown', function(e) {
    e.preventDefault();
    return false;
});
const changeFoodPosition=()=>{
    foodX=Math.floor(Math.random()*120)+1;
    foodY=Math.floor(Math.random()*40)+1;
}
const handleGameOver=()=>{
    clearInterval(setIntervalId);
    
    location.reload();
}
const changeDirection=(e)=>{
    console.log(e)
    if (e.key === "ArrowUp" && velocityY != 1){
        velocityX=0;
        velocityY=-1;
    }else if(e.key === "ArrowDown" && velocityY != -1){
        velocityX=0;
        velocityY=1;
    }else if(e.key === "ArrowLeft" && velocityX != 1){
        velocityX=-1;
        velocityY=0;
    }else if(e.key === "ArrowRight" && velocityX != -1){
        velocityX=1;
        velocityY=0;
    }
}
controls.forEach(key => {
    key.addEventListener("click",()=>changeDirection({key: key.dataset.key}));
});
const initGame = ()=>{
    if(gameOver) return handleGameOver();
    let htmlMarkup=`<div class="food" style="grid-area:${foodY} / ${foodX}"></div>`;
    if(snakeX === foodX && snakeY === foodY){
        changeFoodPosition();
        snakeBody.push([foodX,foodY]);
        score++;
        highScore=score>highScore?score:highScore;
        localStorage.setItem("HighScore",highScore);
        scoreElement.innerText=`Score:${score}`;
        highscoreElement.innerText=`High Score:${highScore}`;
    }
    for(let i=snakeBody.length-1;i>0;i--){
        snakeBody[i]=snakeBody[i-1];
    }
    snakeBody[0]=[snakeX,snakeY];
    snakeX+=velocityX;
    snakeY+=velocityY;
    if(snakeX<=0||snakeX>120||snakeY<=0||snakeY>40){
        gameOver=true;
    }
    for(let i=0;i<snakeBody.length;i++){
        htmlMarkup+=`<div class="head" style="grid-area:${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        if(i !==0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
            gameOver=true;
        }
    }
    playBoard.innerHTML=htmlMarkup;
}

changeFoodPosition();
function handleSelectChange(selectElement) {
  const selectedValue = selectElement.value;
  
  if (selectedValue === "1") {
    setIntervalId=setInterval(initGame,100);
    console.log("Option 1 selected");
} 
else if (selectedValue === "2") {
    setIntervalId=setInterval(initGame,80);
    console.log("Option 2 selected");
}
else if (selectedValue === "3") {
    setIntervalId=setInterval(initGame,60);
    console.log("Option 3 selected");
}else if (selectedValue === "4"){
    setIntervalId=setInterval(initGame,40);
    console.log("options 3 selected");
}else if (selectedValue === "5"){
    setIntervalId=setInterval(initGame,20);
    console.log("Options 5 selected");
}else {
    console.log("No option selected");
    setIntervalId=setInterval(initGame,100);
  }
}
document.addEventListener("keydown",changeDirection);