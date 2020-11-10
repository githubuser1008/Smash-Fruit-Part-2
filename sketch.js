//making variables 
var  sword , swordImage;
var gameoversound , swordcutting;
var enemyGroup, fruitGroup;
var monster, monsterImage;
var  fruit, fruit1, fruit2, fruit3, fruit4;
var gameOverImg;

// variables for gamestates
var PLAY=1;
var END=0;
var gameState=1;

// variable for score
var score ; 


function preload(){

 // loading images and animations
 swordImage = loadImage("sword.png") ;
monsterImage=loadAnimation("alien1.png","alien2.png");
 fruit1=loadImage("fruit1.png"); 
 fruit2=loadImage("fruit2.png");
 fruit3=loadImage("fruit3.png");
 fruit4=loadImage("fruit4.png");
  
  swordcutting = 
  gameoversound = loadSound("gameover.mp3");
  
gameOverImg = loadImage("gameover.png"); 
}

function setup(){
  
  createCanvas(450,450)
  
  // creating groups
  fruitGroup=new Group(); 
  enemyGroup=new Group();
    score=0; 
}

function draw(){
  
  //background
background("lightblue")
  
  // display score
  fill ("orange")
  textSize(20);
  text("Score :" + score, 200,30 )

  //adding gamestates
if(gameState === PLAY){
  
  // adding things that needed only in the play state
Enemy() ;
fruits() ; 
sword = createSprite(40,200,202,20) ;
sword.addImage(swordImage) ; 
sword.scale=0.7;  
  sword.y=World.mouseY;  
  sword.x=World.mouseX;
sword.lifetime=1; 

  
  
if(fruitGroup.isTouching(sword)){
 fruitGroup.destroyEach(); 
 score=score+2 ;
 swordcutting.play(); 
}  

  
 if (sword.isTouching(enemyGroup)){  
  gameState=END; 
   gameoversound.play();
 }
  
} else if(gameState === END) {
 // Change the Animation of the sword to gameoverand reset its position 
   sword = createSprite(40,200,202,20) ;
sword.addImage(gameOverImg) ;

 sword.x=200;  
 sword.y=200;  
   
 fruitGroup.destroyEach() ;
  enemyGroup.destroyEach() ;  
   
 }
 
 drawSprites() ;
}

// function for enemy
function Enemy(){
  
  if(World.frameCount%200===0){
    
 monster=createSprite(400,200,20,20) ; 
 monster.addAnimation("moving",monsterImage) ;
 monster.y=Math.round(random(100,300)) ; 
 monster.velocityX=-(10 + score/10);
 monster.lifetime=45;
  
    enemyGroup.add(monster);
  } 
}

// function for fruits
function fruits(){
  
  if(World.frameCount%80===0){
    
  fruit=createSprite(400,200,20,20);
  fruit.scale=0.2;
    direction = Math.round(random(1,2));
    
    if(direction==1)
    {
      fruit.x = 400;
      fruit.velocityX = -(7+(score/4));
    }
    else if(direction==2)
    {
      fruit.x = 0;
      fruit.velocityX = (7+(score/4));
    }
    
  r=Math.round(random(1,4));
  if(r===1) {
   fruit.addImage(fruit1);
  } else if (r===2) {
   fruit.addImage(fruit2);
  }else if (r===3){
   fruit.addImage(fruit3);
  }else if (r===4){
   fruit.addImage(fruit4);
  }
    fruit.y=Math.round(random(50,340));
    
    //fruit.velocityX=-(10 + score/4);
    fruit.lifetime=100;
    
    fruitGroup.add(fruit); 
  }
  
}