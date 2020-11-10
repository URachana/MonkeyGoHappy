var PLAY =1;
var END =0;
var gameState = PLAY;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score;
var ground,groundImage;
var invisibleGround;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  groundImage=loadImage("ground2.png");
 
}



function setup() {
  createCanvas(400,400);
  
  monkey=createSprite(50,320,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.15;
  
  ground = createSprite(250,390,400,20);
  ground.addImage(groundImage);
  
  invisibleGround= createSprite(250,400,400,10);
  invisibleGround.visible= false;
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  background(rgb(44,255,150));
  ground.depth=monkey.depth;
  monkey.depth= ground.depth+1;
  
  
  textSize(12);
  stroke('black');
  fill('black');
  score= Math.ceil(frameCount/60);
  text("Survival Time:  "+ score + "sec",200,50);
  
  if(gameState === PLAY){
    
    ground.velocityX=-4;
    
    if(keyDown("space") && monkey.y>=200){
      monkey.velocityY= -15; 
    }
    
    serveBanana();
    throwRocks();
    
    if(bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
    }
    
    if(obstacleGroup.isTouching(monkey)){
      gameState= END;
    }   
    
  }
  else if (gameState=== END){
    
    ground.velocityX=0;
    bananaGroup.destroyEach();
    obstacleGroup.destroyEach();
    textSize(24);
    stroke('black');
    fill('black');
    text("GAME OVER",160,200);
    
  }
  
  
  monkey.velocityY= monkey.velocityY + 0.8;
  
  if(ground.x< 100){
    ground.x=ground.width/2;
  }
  
  monkey.collide(invisibleGround);
  drawSprites();
}

function serveBanana(){
  
  if(frameCount% 80 === 0){
    
    
    var i = Math.round(random(20,300));
    banana =createSprite(400,i,1,1);
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.velocityX =-(4+2*(frameCount/100));
    bananaGroup.add(banana);  
    banana.lifetime= 50;
    
  }
}

function throwRocks(){
  if(frameCount% 60 === 0){
    
    var i = Math.round(random(10,200));
    obstacle = createSprite(400,i,1,1);
    obstacle.addImage(obstacleImage);
    obstacle.scale= 0.1;
    obstacle.velocityX=-(4+1.2*(frameCount/100));
    obstacle.lifetime=50;
    obstacleGroup.add(obstacle); 
  }
  
}


