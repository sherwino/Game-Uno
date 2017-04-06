console.log("hero.js is LOADED");


//this js file is for the hero constructor and associated sprites, and movement functions


  //ALl of the global variables I need for now until I refactor the code
  var dude, beeSquad, lastPressed, bee, collect, jumping = false, markerMissle, ground, dot, items, marker, thingImg, platformImg, markerImg, gravityController, projectiles, gravity = 1, bgImg, movementLimits, mapWidth = 12085;
  var theme, bossTheme, npcAttack, runSound, punchcount = 0, paused = false, dropatTitle, beeCreated, beeFlipped = 0, beeSquad, explodeEnemy, startGame = false;
  var showHealthbar, healthShowing,stungbyBee = false, bittenbyBee = false, finalWaveComplete, bittenbyDragon, boom;
  var firstWaveComplete, secondWaveComplete, thirdWaveComplete, fourthWaveComplete, fifthWaveComplete, sixthWaveComplete, boatImg, boat, bossWaveComplete, bossDragon, dragon, bossImg, dragonCreated;


//Creates Protagonist Characters
//Takes two arguments, player name, and the character that the player selected
// gameuno.prototype.
function Hero (name, charID, playerNum) {
  this.name = name;
  this.character = charID;
  this.player = playerNum;
  this.x = -240;
  this.y = 340;
  this.health = 25;
  this.jump = -20;
  this.speed = 7;
  this.sprite = createSprite(this.x, this.y, 30, 60);

}

function preload() {

      bgImg = loadImage("./img/bg1.jpg");
      thingImg = loadImage("./img/ss.png");
      markerImg = loadImage("./img/marker.png");
      boatImg = loadImage("./img/Fanboat.png");
      running = loadSound('./aud/running.mp3');
      bossImg = loadImage("./img/boss/drag.png");
      boom = loadSound("./aud/boom.mp3");

}

function setup () {
  createCanvas(1300,768);
  dude = new Hero ("Bob");
  theme = loadSound('./aud/reaching.mp3', loaded);
  bossTheme = loadSound('./aud/boss.mp3');
  running.setVolume(0.3);
  bossTheme.setVolume(0.6);
  boom.setVolume(0.6);

  dude.sprite.addAnimation("standing", "./img/hero/heroguy9.png", "./img/hero/heroguy9.png");
  dude.sprite.addAnimation("jumping", "./img/hero/heroguy_jump1.png");
  dude.sprite.addAnimation("crouching", "./img/hero/heroguy_crouch1.png");
  dude.sprite.addAnimation("running", "./img/hero/heroguy1.png", "./img/hero/heroguy8.png");
  dude.sprite.addAnimation("spinning", "./img/hero/heroguy1.png", "./img/hero/heroguy8.png");
  dude.sprite.addAnimation("hipunch", "./img/hero/heroguy_hp1.png");
  dude.sprite.addAnimation("lowpunch", "./img/hero/heroguy_lp.png");
  dude.sprite.depth = 20;
  // dude.sprite.debug = true;
  dude.sprite.mass = 20;



  // obstacles = new Group ();
  items = new Group ();
  projectiles = new Group ();
  beeSquad = new Group ();

  ground = createSprite(-200, 450, 80, 50);
  ground.visible = false;
    setTimeout(function(){
      ground.remove();
      dude.sprite.velocity.y = gravity;
      dropatTitle = true;
    },4500);

  boat = createSprite(7460, 748, 92, 45);
  boat.addImage(boatImg);
  boat.addAnimation("destroyed", "./img/xplo-1.png", "./img/xplo-9.png");
  boat.collide(dude.sprite);
  boat.setCollider("rectangle", 20, 0, 97, 28);

createBees = function (num) {
    for (var i=0; i<num; i++) {
    bee = createSprite(random(800, 2000), random(20, 300));
    bee.addAnimation("flying", "./img/bee1.png", "./img/bee6.png");
    bee.addAnimation("destroyed", "./img/xplo-1.png", "./img/xplo-9.png");

    bee.friction = random(0.9, 0.99);
    bee.mirrorX(-1);
    bee.rotateToDirection = true;
    bee.flipped = false;
    bee.destroyed = false;
    bee.attack = 0.5;
    // bee.velocity.x -= random(5, 10);
    beeSquad.add(bee);
    beeCreated = true;
      } //close for loop
    // }, 20000); //close setinterval
}; //close the create bees function


markerMissle = function () {
  marker = createSprite(dude.sprite.position.x, dude.sprite.position.y);
  marker.addImage(markerImg);
  marker.addAnimation("destroyed", "./img/xplo-1.png", "./img/xplo-9.png");
  marker.scale = 0.8;
  if (lastPressed === "left") {
    marker.setSpeed(10+dude.sprite.getSpeed(), 180);
    marker.mirrorX(-1);
  } else if (lastPressed === "right") {
    marker.setSpeed(10+dude.sprite.getSpeed(), 0);
    marker.mirrorX(1);
  }
  marker.life = 200;
  projectiles.add(marker);
};

for (i=0; i<10; i++) {
  dot = createSprite(random(1320, 6000), random(0,height));
  dot.addImage(thingImg);
  dot.debug = false;
  items.add(dot);
  }

  bossDragon = function() {
    dragon = createSprite(11000, 400, 20, 20);
    dragon.addImage(bossImg);
    dragon.attack = 5;
    dragon.health = 100;
    dragon.immovable = true;
    dragon.debug = false;
    dragonCreated = true;
  };

  textSize(25);

  runSound = function () {
    if (keyDown(LEFT_ARROW) && !running.isPlaying() && dude.sprite.position.y > height - 40  ){
      running.pan(-0.5);
      running.loop();
    } else if (keyDown(RIGHT_ARROW) && !running.isPlaying()&& dude.sprite.position.y > height - 40 ){
      running.pan(0.5);
      running.loop();

    } else if (keyDown(16)) {
      running.rate(1.25);
    }
  }; //end of the runSound function






} //end of the setup function

function loaded(){
theme.setVolume(0);
theme.loop();
theme.setVolume(0.01, 0, 5);
}

function explodeEnemy (enemy) {
  enemy.changeAnimation("destroyed");
  boom.play();
  setTimeout(function(){
    enemy.remove();
},500);
}

//resize canvas function
// var canvas = document.querySelector("canvas");
//
// window.addEventListener("resize", function(){
//   canvas.setAttribute("width", window.innerWidth);
// });

function draw () {
    if(startGame){
      clear();
      image(bgImg, -400,0);
      gameMusic();
      dude.sprite.velocity.y += gravity;
      movementLimits();
      npcGenerator();
      projectilesDestroyThings(beeSquad);
      projectilesAffectDragons();
      npcsChaseYou(beeSquad);
      bossChaseYou(dragon);
      healthMonitor();
      drawSprites();
    }
} //end of the draw function


movementLimits = function () {

  //camera movements and their restrictions
  //camera is set to follow  the protagonnist only
    if (dude.sprite.position.x > mapWidth - 780) {
      camera.position.x = mapWidth - 780;
    } else if (dude.sprite.position.x < 280) {
      camera.position.x = 280;
      // camera.position.y = dude.sprite.position.y;
    } else {
      camera.position.x = dude.sprite.position.x;
      camera.position.y = height/2; //maybe
      camera.zoom = 1;
    }


      //here are all of the button press functions for the main character

    if (keyDown(UP_ARROW)) {
      dude.sprite.changeAnimation("jumping");

      if (dude.sprite.position.y > height - 80 || dude.sprite.collide(beeSquad)) {
            dude.sprite.velocity.y = dude.jump; //maybe
      }
    }

    if (keyDown(DOWN_ARROW)) {
      dude.sprite.changeAnimation("crouching");
    }

    if (keyDown(RIGHT_ARROW)) {
      dude.sprite.mirrorX(1);
      dude.sprite.rotate = 0;
      dude.sprite.velocity.x = dude.speed;
      lastPressed = "right";
      runSound();
      if (keyDown(RIGHT_ARROW) && keyDown(UP_ARROW)){
        dude.sprite.changeAnimation("jumping");
      } else if (keyDown(RIGHT_ARROW)) {
        dude.sprite.changeAnimation("running");
      }
      // dude.sprite.velocity.y = gravity;

    }

    if (keyDown(LEFT_ARROW)) {
      dude.sprite.changeAnimation("running");
      dude.sprite.mirrorX(-1);
      dude.sprite.rotate = 180;
      dude.sprite.velocity.x = -dude.speed;
      lastPressed = "left";
      runSound();
      if (keyDown(LEFT_ARROW) && keyDown(UP_ARROW)){
        dude.sprite.changeAnimation("jumping");
      } else if (keyDown(LEFT_ARROW)) {
        dude.sprite.changeAnimation("running");
      }
    }

    if (keyIsDown(90)) {
      dude.sprite.changeAnimation("hipunch");
      console.log(punchcount);
      punchcount++;
    }

    if (keyDown(88)) {
      dude.sprite.changeAnimation("lowpunch");
      console.log("Low Punch");
    }

    if (keyWentDown("c")){
      markerMissle();
    }

    if (keyDown(16)) {
        dude.speed = 20;
      } else{
        dude.speed = 7;
      }
      //finally a pause game function!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    if (keyWentDown("p") && !paused){
      updateSprites(false);
      theme.stop();
      bossTheme.stop();
      console.log("GAME PAUSED");
      paused = true;

    } else if (keyWentDown("p") && paused) {
      updateSprites(true);
      theme.loop();
      console.log("GAME STARTED");
      paused = false;
    }
    //map limits for the character
    //need to send to a seperate function and it needs to take arguments for the NPCs
    if (dude.sprite.position.x > mapWidth) {
      dude.sprite.position.x = mapWidth;
      dude.sprite.velocity.x = 0;
    }

    if (dude.sprite.position.x < -330) {
      dude.sprite.position.x = -330;
      dude.sprite.velocity.x = 0;
    }

    if (dude.sprite.position.x > 1637) {
      showHealthbar(true);
    }

    if (dude.sprite.position.y > height - 32) {
      dude.sprite.position.y = height - 32;
      dude.sprite.velocity.y = 0;
    } else if (dude.sprite.position.x > 7458 && dude.sprite.position.y > height - 32){
      dude.sprite.velocity.y = 0.5;
    }
    if (boat.position.y > 748) {
      boat.position.y = 748;
      boat.velocity.y = 0;
    }

    if (dragonCreated){
      if (dragon.position.y > 548) {
      dragon.position.y = 548;
      dragon.velocity.y = 0;
      }
    }

    if (dude.sprite.position.y < 40) {
      dude.sprite.position.y = 40;
      dude.sprite.velocity.y = 0;
    }

    if(dude.sprite.collide(ground) && !dropatTitle) {
      dude.sprite.velocity.y = 0;
    }

    if(dude.sprite.overlap(boat)) {
      dude.sprite.collide(boat);
      boat.velocity.x = 1.5;
      dude.sprite.position.x = boat.position.x;
    }

    if(boat.position.x > 11036) {
      boat.velocity.x = 0;
    }
    //temporary function this is going to fine tuned later to work only when the bee has been rotated upside down.
    //Just need to find out from what angle to what angle will the function run and that will help set those values.
    if (beeCreated) { //only run this if the bee has been created, and if the bee hasn't already been flipped.
      for (i=0; i < beeSquad.length; i++){
      if (dude.sprite.position.x < beeSquad[i].position.x && beeSquad[i].flipped === false){
            beeSquad[i].mirrorY(-1);
            beeSquad[i].flipped = true;
      } //end of if position statement

      if (dude.sprite.position.x > beeSquad[i].position.x && beeSquad[i].flipped === true){
            beeSquad[i].mirrorY(1);
            beeSquad[i].flipped = false;
      } //end of if position statement

      //adding a damage statement to resuse the same for loop, need to re-factor this as well
      if (beeSquad[i].overlap(dude.sprite)){
        if (beeSquad[i].touching && !bittenbyBee){
          bittenbyBee = true;
          npcsHurtYou(beeSquad[i].attack);
        } else if (beeSquad[i].touching.top && !stungbyBee){
          stungbyBee = true;
          npcsHurtYou(beeSquad[i].attack * 2);
        }
      }
    } //end of for loop
} // end of if bee created conditional

if (dragonCreated) {
  if (dragon.overlap(dude.sprite) && !bittenbyDragon) {
    bittenbyDragon = true;
    npcsHurtYou(dragon.attack);
  }
}


    dude.sprite.overlap(items, collect);
    // if (dude.sprite.collide(beeSquad)){
    //   deadTime = Date.now();
    // }
    function collect(collector, collected){
      dude.sprite.scale += 0.15;
      dude.health += 1;
      collected.remove();
    }

};

projectilesDestroyThings = function(group) {
  //will have to add this collision later because I want to make it a little bit smarter
  //the projectile has collisions when attached to a surface but not when it leaves the dude
  // dude.sprite.collide(projectiles);
  projectiles.collide(group);

  for (i=0; i < group.length; i++) {
    if (projectiles.overlap(group[i])) {
      explodeEnemy(group[i]);
    }
    dude.sprite.collide(group);

  }

}; //end of the projectilesDestroyThings function

projectilesAffectDragons = function () {
  if (dragonCreated) {
  projectiles.collide(dragon);
  for (i=0; i < projectiles.length; i++) {
    if(projectiles[i].overlap(dragon)){
        projectiles[i].changeAnimation("destroyed");
        dragon.health -= 2;
        setTimeout(projectiles[i].remove , 500);
        if (dragon.health < 1){
          dragon.remove();
        }
    } //if projectiles overlap
  } //for loop
} //if dragon created
};


//every 3seconds npcs could damage you again
//this resets their ability to do that, because if I count every collision and overlap
//the game will be over fairly quick


function keyReleased() {
  if (lastPressed === "right"){
    dude.sprite.setSpeed(0, 0);
  } else if (lastPressed === "left"){
    dude.sprite.setSpeed(0, 180);
  }

  running.stop();
  // theme.stop();
  // dude.sprite.velocity.y = 15;
  dude.sprite.changeAnimation("standing");
  return false; // prevent any default behavior
}

//prevent default behavior of scrolling the browser window with arrow keys
//This is a temporary workaround until a fix window.


var keys = {};
window.addEventListener("keydown",
    function(e){
        keys[e.keyCode] = true;
        switch(e.keyCode){
            case 37: case 39: case 38:  case 40: // Arrow keys
            case 32: e.preventDefault(); break; // Space
            default: break; // do not block other keys
        }
    },
false);
window.addEventListener('keyup',
    function(e){
        keys[e.keyCode] = false;
    },
false);
