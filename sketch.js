const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var backgroundImg, castle1, castle;
var life = 3;
var score = 0;
var gameState = 1;

function preload() {
  backgroundImg = loadImage("sprites/sbg.jpg");
  castle1 = loadImage("sprites/castle.png");
  blastImg = loadImage("sprites/blast.png");
  bulletImg1 = loadImage("sprites/bullet1.png");
  bulletImg2 = loadImage("sprites/bullet2.png");
  bulletImg3 = loadImage("sprites/bullet3.png");
  bulletImg4 = loadImage("sprites/bullet4.png");
  back1 = loadImage("sprites/back.jpg");
  obstacle1 = loadAnimation(
    "enemies/b1.png",
    "enemies/b2.png",
    "enemies/b3.png"
  );
  obstacle2 = loadAnimation(
    "enemies/e1.png",
    "enemies/e2.png",
    "enemies/e3.png"
  );
  obstacle3 = loadAnimation("enemies/g1.png", "enemies/g2.png");
  obstacle4 = loadAnimation(
    "enemies/p1.png",
    "enemies/p2.png",
    "enemies/p3.png"
  );
  obstacle5 = loadAnimation("enemies/s1.png", "enemies/s2.png");

  player1 = loadAnimation(
    "sprites/l-1.png",
    "sprites/l-2.png",
    "sprites/l-3.png"
  );
  player2 = loadAnimation(
    "sprites/r-1.png",
    "sprites/r-2.png",
    "sprites/r-3.png"
  );

  brick = loadImage("sprites/bricks1.jpg");
}

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  castle = createSprite(300, 250);
  player = createSprite(windowWidth / 2 - 250, 450);
  player.addAnimation("r", player2);
  castle.addImage(castle1);
  castle.scale = 1.5;
  player.scale = 0.5;
  ObstaclesGroup = new Group();
  bulletGroup = new Group();
  heading = createElement("h1");
  scoreboard = createElement("h1");
  note = createElement("h3");
  for (let index = 0; index < windowWidth - 100; index = index + 100) {
    b18 = createSprite(index, 850);
    b18.addImage(brick);
    b20 = createSprite(index, 50);
    b20.addImage(brick);
    b20.scale = 0.1;
    b18.scale = 0.1;
  }
  for (let index = 0; index < windowWidth - 100; index = index + 100) {
    b18 = createSprite(index, 50);
    b18.addImage(brick);
    b18.scale = 0.1;
  }
  for (let index = 0; index < windowHeight; index = index + 100) {
    b19 = createSprite(windowWidth - 50, index);
    b19.addImage(brick);
    b19.scale = 0.1;
    b19 = createSprite(windowWidth - 1700, index);
    b19.addImage(brick);
    b19.scale = 0.1;
  }
}

function draw() {
  background(backgroundImg);

  heading.html("Life:" + life);
  heading.style("color:red");
  heading.position(windowWidth / 2 - 650, windowHeight / 2 + 300);

  scoreboard.html("Score:" + score);
  scoreboard.style("color:green");
  scoreboard.position(windowWidth / 2 + 300, windowHeight / 2 - 350);

  note.html("PRESS SPACE TO SHOOT BULLETS");
  note.style("color:black");
  note.position(windowWidth / 2 + 300, windowHeight / 2 - 300);

  if (gameState === 1) {
    player.y = mouseY;
    player.x = mouseX;

    if (keyDown("space")) {
      shootBullet4();
    }

    if (ObstaclesGroup.collide(castle)) {
      handleGameover(ObstaclesGroup);
    }

    if (ObstaclesGroup.collide(bulletGroup)) {
      handlecollission(ObstaclesGroup);
    }
    spawnObstacles();
    drawSprites();
  }
}
function spawnObstacles() {
  if (frameCount % 60 === 0) {
    obstacle = createSprite(200, 225);

    //generate random obstacles
    var rand = Math.round(random(1, 5));
    switch (rand) {
      case 1:
        obstacle.addAnimation("b", obstacle1);
        obstacle.x = random(600, 1200);
        obstacle.y = random(125, 600);
        break;
      case 2:
        obstacle.addAnimation("e", obstacle2);
        obstacle.x = random(600, 1200);
        obstacle.y = random(125, 600);
        break;
      case 3:
        obstacle.addAnimation("g", obstacle3);
        obstacle.x = random(600, 1200);
        obstacle.y = random(125, 600);
        break;
      case 4:
        obstacle.addAnimation("p", obstacle4);
        obstacle.x = random(600, 1200);
        obstacle.y = random(125, 600);
        break;
      case 5:
        obstacle.addAnimation("s", obstacle5);
        obstacle.x = random(600, 1200);
        obstacle.y = random(125, 600);
        break;
      default:
        break;
    }

    //assign scale and lifetime to the obstacle
    obstacle.scale = 1.2;
    obstacle.lifetime = 400;
    obstacle.velocityX = -6;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}

function shootBullet4() {
  bullet4 = createSprite(150, width / 2, 50, 20);
  bullet4.y = player.y - 20;
  bullet4.x = player.x - 20;
  bullet4.addImage(bulletImg4);
  bullet4.scale = 0.12;
  bullet4.velocityX = 7;
  bulletGroup.add(bullet4);
}

function handlecollission() {
  if (life > 0) {
    score = score + 1;
  }
  blast = createSprite(bullet4.x + 60, bullet4.y, 50, 50);
  blast.addImage(blastImg);
  blast.scale = 0.3;
  blast.life = 20;
  ObstaclesGroup.destroyEach();
}

function handleGameover(ObstaclesGroup) {
  life = life - 1;
  ObstaclesGroup.destroyEach();
  if (life === 0) {
    gameState = 2;

    swal({
      title: `Game Over`,
      text: "Oops you lost the game....!!!",
      text: "Your Score is " + score,
      imageUrl:
        "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "Thanks For Playing",
    });
  }
}
