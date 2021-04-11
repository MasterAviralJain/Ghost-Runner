var tower , towerImg, ghost, ghostStandImg, ghostJumpImg;
var PLAY=0
var END=1
var gameState=PLAY;
var doorImg,climbImg;
var doorGroup;
var climberGroup;
 

function preload(){
towerImg=loadImage("tower.png");
ghostStandImg=loadImage("ghost-standing.png");
doorImg=loadImage("door.png");
climberImg=loadImage("climber.png");
}


function setup(){
createCanvas (600, 600);
tower=createSprite(300, 300);
tower.addImage(towerImg);
tower.velocityY=1; 
ghost=createSprite(300, 200, 50, 50);
ghost.addImage(ghostStandImg);
ghost.scale=0.5;
doorGroup=new Group();
climberGroup=new Group();
}



function draw(){


if (gameState===PLAY){
if (keyDown("space")){
    ghost.velocityY=-10;
}
ghost.velocityY=ghost.velocityY+0.5;

if (keyDown("left_arrow")){
    ghost.x=ghost.x-3;
}
if (keyDown("right_arrow")){
    ghost.x=ghost.x+3;
}

if (tower.y>400){
    tower.y=300;
}

if (climberGroup.isTouching(ghost)){
    ghost.velocityY=0;
}
if (doorGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gameState=END;
    
}

doors();
drawSprites();
}
if (gameState===END){
    fill("yellow");
    stroke("yellow");
    textSize(30);
text("Game Over",230,250);

}



    
}

function doors(){
if(frameCount%200===0){

    var door=createSprite(random(120,450),-50);
    var climber=createSprite(200,10)
    var iBlock=createSprite(200,15)
    climber.x=door.x;
    iBlock.width=climber.width
    iBlock.height=2;
    iBlock.x=door.x

    door.velocityY=1;
    climber.velocityY=1;
    iBlock.velocityY=1;

    climber.addImage(climberImg);
    door.addImage(doorImg);

    door.depth=ghost.depth;
    ghost.depth+=1

    door.lifetime=800;
    climber.lifetime=800;
    iBlock.lifetime=800;

    doorGroup.add(iBlock);
    climberGroup.add(climber);
    iBlock.debug=true
}
    
}
