// THIS IS CHECK.
let inputDir = {x:0, y:0};
const foodSound = new Audio('food.wav');
const moveSound = new Audio('move.wav');
const gameoverSound = new Audio('gameover.wav');
const musicSound = new Audio('music.mp3');

let score=0;
let speed=6;
let lastpainttime = 0;
let snakeArr = [
    {x: 13,y:15}
];
let food={x:6,y:7};


//game functionN
function main(ctime){
    window.requestAnimationFrame(main);
   // console.log(ctime);
    if((ctime-lastpainttime)/1000 < 1/speed){
        return;
    }
     lastpainttime = ctime;
      gameEngine();

}

function iscollide(snake){
    for(let i= 1;i<snakeArr.length;i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
        if(snake[0].x >=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y <=0){
            return true;
        }
    

}

function gameEngine(){
    if(iscollide(snakeArr)){
        gameoverSound.play();
        musicSound.pause();
        inputDir = {x: 0, y: 0};
        alert("Game Over. Press any key to play again");
        snakeArr =[{x:13, y: 15}];
        musicSound.play();
        score = 0;

    }

//if you have eaten the food incriment the score and regenrate food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score+= 1;
        scoreBox.innerHTML ="Score:" + score;
        snakeArr.unshift({x: snakeArr[0].x +inputDir.x, y: snakeArr[0].y +inputDir.y})
        let a=2;
        let b=16;   
        food ={x: Math.round(a + (b-a)* Math.random()),y: Math.round(a + (b-a)* Math.random())}
    }
    
// Moving Snake
    for(let i= snakeArr.length-2 ; i>=0 ; i--){
        snakeArr[i+1] = {...snakeArr[i]};

    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //Display snake
    board.innerHTML ="";
    snakeArr.forEach((e,index)=>{
         snakeElement = document.createElement('div');
         snakeElement.style.gridRowStart =e.y;
         snakeElement.style.gridColumnStart =e.x;
         if(index === 0){
             snakeElement.classList.add('head');
         }
         else{
             snakeElement.classList.add('tail');
         }
         board.appendChild(snakeElement);
    });
    //display food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart =food.y;
    foodElement.style.gridColumnStart =food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);
}
//main function
window.requestAnimationFrame(main);
window.addEventListener('keydown',e =>{
    inputDir ={x: 0, y:1 }//start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x= 0;
            inputDir.y= -1;
            break;
        
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x= 0;
            inputDir.y= 1;
            break;
        
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x= -1;
            inputDir.y= 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x= 1;
            inputDir.y= 0;
            break;

    
        default:
            break;
    }
});
