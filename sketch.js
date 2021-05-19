var boy,boyImg,boyImg2;

var dog,dogImg,dogImg2;

var backGround,backImg;

var invisibleGround;

var waterPump,waterPumpImg,waterPumpGroup;

var tyres,tyresImg,tyresGroup;

var bench,benchImg,benchGroup;

var popSound,jumpSound;

var bBalloon,bBalloonImg,bBalloonGroup;

var rBalloon,rBalloonImg,rBalloonGroup;

var gBalloon,gBalloonImg,gBalloonGroup;

var font;

var score = 0;

var Balloons = 0;

var gameState = "PLAY",PLAY = 1,END = 0;

var gameOver,gameOverImg,restart,restartImg;

function preload(){
boyImg = loadAnimation("b1.png","b2.png","b3.png","b4.png","b5.png","b6.png");
boyImg2 = loadAnimation("boyfall.png");

dogImg = loadAnimation("dog1s.png","dog2s.png","dog3s.png","dog4s.png");
dogImg2 = loadAnimation("dog4s.png");

backImg = loadImage("back11ss.png");

font = loadFont("FEASFBRG.TTF");

waterPumpImg = loadImage("obs1.png");
tyresImg = loadImage("obs2.png");
benchImg = loadImage("obs3.png");

popSound = loadSound("pop.mp3");
jumpSound = loadSound("jump.mp3");

bBalloonImg = loadAnimation("bballoon1.png");
rBalloonImg = loadAnimation("rballon.png");
gBalloonImg = loadAnimation("gballoon1.png");

gameOverImg = loadAnimation("overs.png");
restartImg = loadAnimation("reset.png");

}

function setup() {
    createCanvas(windowWidth, windowHeight);

    backGround = createSprite(width/2 + 1900,windowHeight/2);
    backGround.addImage(backImg);
    backGround.scale = 0.7;

    boy = createSprite(windowWidth/2 - 200,windowHeight/2+250);
    boy.addAnimation("boyI",boyImg);
    boy.scale = 1.95;

    dog = createSprite(windowWidth/2 - 600,windowHeight/2+280);
    dog.addAnimation("dogI",dogImg);
    dog.scale = 1.2;

    invisibleGround = createSprite(windowWidth/2,windowHeight/2 + 340,width,20);
    invisibleGround.visible = false;

    waterPumpGroup = createGroup();
    tyresGroup = createGroup();
    benchGroup = createGroup();

    bBalloonGroup = createGroup();
    rBalloonGroup = createGroup();
    gBalloonGroup = createGroup();
    

    gameOver = createSprite(windowWidth/2,windowHeight/2 - 200);
    gameOver.addAnimation("gameOver",gameOverImg);
    gameOver.scale = 1.7;

    restart = createSprite(windowWidth/2,windowHeight/2 + 60);
    restart.addAnimation("restart",restartImg);
    restart.scale = 0.9;

    dog.setCollider("rectangle",40,0,170,90,0);
    dog.debug = false;

    boy.setCollider("rectangle",-10,10,25,70,0);
    boy.debug = false;

  }
  
  function draw() {
    background(220);
    if(gameState === "PLAY"){
    gameOver.visible = false;
    restart.visible = false;
    boy.setCollider("rectangle",-10,10,25,70,0);
    boy.debug = false;
    score = score + Math.round(getFrameRate()/60);

    backGround.velocityX = -11;

    if(backGround.x < windowWidth/2-1910){
        backGround.x = width/2 + 1900;
    }   

    if(keyDown("space") && boy.y >= windowHeight/2 + 230){
        boy.velocityY = -23;
        jumpSound.play();
    }
    if(boy.y <= windowHeight/2 + 240){
    boy.setCollider("rectangle",10,5,30,90,50);
    boy.debug = false;
    }

    if(dog.isTouching(tyresGroup) || dog.isTouching(benchGroup) || dog.isTouching(waterPumpGroup)){
      dog.velocityY = -18;
    }

    boy.velocityY = boy.velocityY + 1;
    dog.velocityY = dog.velocityY + 1;
   

    if(boy.isTouching(bBalloonGroup)){
      Balloons += 1;
    bBalloonGroup.destroyEach();
    popSound.play();
    }


    if(boy.isTouching(rBalloonGroup)){
      Balloons += 1;
    rBalloonGroup.destroyEach();
    popSound.play();
    }

    if(boy.isTouching(gBalloonGroup)){
      Balloons += 1;
    gBalloonGroup.destroyEach();
    popSound.play();
    }

    if(boy.isTouching(waterPumpGroup) || boy.isTouching(benchGroup) || boy.isTouching(tyresGroup)){
    gameState  = "END";
    boy.addAnimation("boyI",boyImg2);
    dog.addAnimation("dogI",dogImg2);
    boy.x -= 150;
    boy.setCollider("rectangle",-10,-12,25,70,0);
    boy.debug = false;
    }
    

    
    
    spawnBench();
    spawnTyres();
    spawnWaterPump();

    spawnbBalloon();
    spawnrBalloon();
    spawngBalloon();
    
  }

  if(gameState === "END"){
    gameOver.visible = true;
    restart.visible = true;
    boy.velocityY = 10;
    dog.velocityY = 10;
    backGround.velocityX = 0;
    benchGroup.setLifetimeEach(-1);
    tyresGroup.setLifetimeEach(-1);
    waterPumpGroup.setLifetimeEach(-1);
    bBalloonGroup.setLifetimeEach(-1);
    rBalloonGroup.setLifetimeEach(-1);
    gBalloonGroup.setLifetimeEach(-1);
   
    benchGroup.setVelocityXEach(0);
    tyresGroup.setVelocityXEach(0);
    waterPumpGroup.setVelocityXEach(0);
    bBalloonGroup.setVelocityXEach(0);
    rBalloonGroup.setVelocityXEach(0);
    gBalloonGroup.setVelocityXEach(0);

    bBalloonGroup.setVelocityYEach(0);
    rBalloonGroup.setVelocityYEach(0);
    gBalloonGroup.setVelocityYEach(0);

    if(mousePressedOver(restart)){
      reset();
    }
  }

  boy.collide(invisibleGround);
    dog.collide(invisibleGround);
    drawSprites();

    textFont(font);
    fill("red");
    textSize(45);
    text("SCORE : " + score,windowWidth/2-950,windowHeight/2 - 410);
    text("BALLOONS : " + Balloons,windowWidth/2 + 700,windowHeight/2-410);

  }

  function reset(){
    gameState = "PLAY";
    boy.x  = windowWidth/2 - 200;
    benchGroup.destroyEach();
    waterPumpGroup.destroyEach();
    tyresGroup.destroyEach();
    rBalloonGroup.destroyEach();
    bBalloonGroup.destroyEach();
    gBalloonGroup.destroyEach();
    boy.addAnimation("boyI",boyImg);
    dog.addAnimation("dogI",dogImg);
    score = 0;
    Balloons = 0;
  }

  function spawnBench(){
    if(frameCount % 240 === 0){
      bench = createSprite(width/2 + 1100,height/2 + 275);
      bench.addImage("bench",benchImg);
      bench.velocityX = -11; 
      bench.setCollider("rectangle",0,0,150,80,0);
      bench.debug = false;
      bench.scale = 0.24;
      benchGroup.add(bench);
    
    }
      
  }

  function spawnTyres(){
    if(frameCount % 650 === 0){
      tyres = createSprite(width/2 + 1100,height/2 + 275);
      tyres.addImage("tyres",tyresImg);
      tyres.velocityX = -11;  
      tyres.scale = 0.9;
      tyres.debug = false;
      tyres.setCollider("rectangle",10,0,100,120,0);
      tyresGroup.add(tyres);
   
    }
    }

  
function spawnWaterPump(){
  if(frameCount % 380 === 0){
    waterPump = createSprite(width/2 + 1100,height/2 + 275);
    waterPump.debug = false;
    waterPump.setCollider("rectangle",0,0,50,70,0);
   waterPump.addImage("pump",waterPumpImg);
    waterPump.velocityX =-11; 
    waterPump.scale = 1.2;
    waterPumpGroup.add(waterPump);
  }
}

function spawnbBalloon(){
  if(frameCount % 250 === 0){
    bBalloon = createSprite(width/2 + 1200,height);
    bBalloon.addAnimation("blue",bBalloonImg);
    bBalloon.y = Math.round(random(height/2 - 70,height/2 + 90))
    bBalloon.velocityX = -11; 
    bBalloon.scale = 1.1;
    bBalloon.velocityY = -0.1;
    bBalloon.debug = false;
      bBalloon.setCollider("circle",0,0,22);
    bBalloonGroup.add(bBalloon);
    gameOver.depth = bBalloon.depth;
    gameOver.depth = bBalloon.depth + 1;
    restart.depth = bBalloon.depth;
    restart.depth = bBalloon.depth + 1;
  }
}

function spawnrBalloon(){
  if(frameCount % 190 === 0){
    rBalloon = createSprite(width/2 + 1200,height);
    rBalloon.addAnimation("red",rBalloonImg);
    rBalloon.y = Math.round(random(height/2 - 70,height/2 + 90))
    rBalloon.velocityX = -11; 
    rBalloon.scale = 1.1;
    rBalloon.velocityY = -0.1;
    rBalloon.debug = false;
    rBalloon.setCollider("circle",0,0,20);
    rBalloonGroup.add(rBalloon);
    gameOver.depth = rBalloon.depth;
    gameOver.depth = rBalloon.depth + 1;
    restart.depth = rBalloon.depth;
    restart.depth = rBalloon.depth + 1;
  }
}

function spawngBalloon(){
  if(frameCount % 120 === 0){
    gBalloon = createSprite(width/2 + 1200,height);
    gBalloon.addAnimation("blue",gBalloonImg);
    gBalloon.y = Math.round(random(height/2 - 70,height/2 + 90))
    gBalloon.velocityX = -11; 
    gBalloon.scale = 1.1;
    gBalloon.debug = false;
    gBalloon.setCollider("circle",0,0,20);
    gBalloonGroup.add(gBalloon);
    gBalloon.velocityY = -0.1;
    gameOver.depth = gBalloon.depth;
    gameOver.depth = gBalloon.depth + 1;
    restart.depth = gBalloon.depth;
    restart.depth = gBalloon.depth + 1;
  }
}




