console.log("hero.js is LOADED");

//This is to prevent CORS errors in chrome while offline testing
//Don't need it when I host the files using a node http server
//"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --user-data-dir="C:/Chrome dev session2" --disable-web-security



//this js file is for the hero constructor and associated sprites, and movement functions

// function gameuno () {
//   this.score = 0;
//   this.levelCleared = false;
//   this.GameOver = false;
//   this.mapObject = 0;
//   this.weapObject = 0;
//   this.diffObject = 0;

  //ALl of the global variables I need for now until I refactor the code
  var dude, obstacles, lastPressed, bee, collect, jumping = false, markerMissle, ground, dot, items, marker, thingImg, platformImg, markerImg, gravityController, projectiles, gravity = 1, bgImg, movementLimits, mapWidth = 12085;
  var theme, npcAttack, runSound, punchcount = 0, paused = false, dropatTitle;

//   //Object Array
//   this.charObject = [
//     { charac: "hero", standing: "./img/hero/heroguy9.png", runningStart: "./img/hero/heroguy1.png", runningEnd: "./img/hero/heroguy8.png",
//       theme: "./aud/kens.mp3" },
//
//   ]
//   }
//
// } //the whole game

//Creates Protagonist Characters
//Takes two arguments, player name, and the character that the player selected
// gameuno.prototype.
function Hero (name, charID, playerNum) {
  this.name = name;
  this.character = charID;
  this.player = playerNum;
  this.x = -200;
  this.y = 340;
  this.health = 5;
  this.jump = -20;
  this.speed = 7;
  this.sprite = createSprite(this.x, this.y, 60, 60);

}

function preload() {

      bgImg = loadImage("./img/bg1.jpg");
      thingImg = loadImage("./img/ss.png");
      markerImg = loadImage("./img/marker.png");
      running = loadSound('./aud/running.mp3');
}

function setup () {
  createCanvas(1024,768);
  dude = new Hero ("Bob");
  theme = loadSound('./aud/reaching.mp3', loaded);
  running.setVolume(0.3);


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



  obstacles = new Group ();
  items = new Group ();
  projectiles = new Group ();

  ground = createSprite(-200, 400, 200, 50);
  ground.visible = false;
  setTimeout(function(){
    ground.remove();
    dude.sprite.velocity.y += gravity;
    dropatTitle = true;
  },4500);


  setInterval(function () {
    for (var i=0; i<5; i++) {
    bee = createSprite(random(800, 5000), random(100, height - 20));
    bee.addAnimation("flying", "./img/bee1.png", "./img/bee6.png");
    bee.friction = random(0.5, 0.99);
    bee.mirrorX(-1);
    bee.rotateToDirection = true;
    // bee.velocity.x -= random(5, 10);
    //force (acceleration), pointx, pointy
    obstacles.add(bee);
    bee.life = 2500;

      } //close for loop
    }, 40000); //close setinterval


markerMissle = function () {
  marker = createSprite(dude.sprite.position.x, dude.sprite.position.y);
  marker.addImage(markerImg);
  if (lastPressed === "left") {
    marker.setSpeed(10+dude.sprite.getSpeed(), 180);
    marker.mirrorX(-1);
  } else if (lastPressed === "right") {
    marker.setSpeed(10+dude.sprite.getSpeed(), 0);
    marker.mirrorX(1);
  }
  marker.life = 300;
  projectiles.add(marker);
};

  // ground = createSprite(-110, 715);
  // ground.addImage(platformImg);
  // ground.immovable = true;
  //
  // ground.visible = false;
  // ground.debug = true;
  // obstacles.add(ground);



for (i=0; i<10; i++) {
  dot = createSprite(random(1320, 6000), random(0,height));
  dot.addImage(thingImg);
  dot.debug = false;
  items.add(dot);
  }

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

function draw () {

    clear();
    image(bgImg, -400,0);

    fill(255);
    text("Game-Uno", -300, 50);
    text("by Sherwino", -300, 75);
    text(keyCode, -300, 100);

    dude.sprite.velocity.y += gravity;
    movementLimits();

    dude.sprite.collide(projectiles);
    if(dude.sprite.collide(ground) && !dropatTitle) {
      dude.sprite.velocity.y = 0;
    }

    for (i=0; i < obstacles.length; i++) {
      obstacles.displace(projectiles);
      dude.sprite.collide(obstacles);
      obstacles[i].attractionPoint(random(0.5, 1.2), dude.sprite.position.x, dude.sprite.position.y);
      obstacles.collide(dude.sprite);
      //since the force keeps incrementing the speed you can
      //set a limit to it with maxSpeed
      obstacles[i].maxSpeed = random(10, 20);
    }

    drawSprites();

} //end of the draw function


movementLimits = function () {
  //camera movements and their restrictions
    if (dude.sprite.position.x > mapWidth - 780) {
      camera.position.x = mapWidth - 780;
    } else if (dude.sprite.position.x < 180) {
      camera.position.x = 180;
    } else {
      camera.position.x = dude.sprite.position.x;
    }
      camera.position.y = height/2; //maybe
      camera.zoom = 1;

    if (keyDown(UP_ARROW)) {
      dude.sprite.changeAnimation("jumping");

      if (dude.sprite.position.y > height - 80 || dude.sprite.collide(obstacles)) {
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
      console.log("GAME PAUSED");
      paused = true;

    } else if (keyWentDown("p") && paused) {
      updateSprites(true);
      theme.loop();
      console.log("GAME STARTED");
      paused = false;
    }

    if (dude.sprite.position.x > mapWidth) {
      dude.sprite.position.x = mapWidth;
      dude.sprite.velocity.x = 0;
    }

    if (dude.sprite.position.x < -330) {
      dude.sprite.position.x = -330;
      dude.sprite.velocity.x = 0;
    }

    if (dude.sprite.position.y > height - 32) {
      dude.sprite.position.y = height - 32;
      dude.sprite.velocity.y = 0;
    }

    if (dude.sprite.position.y < 40) {
      dude.sprite.position.y = 40;
      dude.sprite.velocity.y = 0;
    }

    if (dude.sprite.position.x < 400) {
        theme.setVolume(0.1, 0, 1);
    } else if (dude.sprite.position.x > 500) {
        theme.setVolume(0.2, 0, 2);
      } else if (dude.sprite.position.x > 700) {
          theme.setVolume(0.3, 0, 4);
        }



    projectiles.collide(obstacles);
    dude.sprite.overlap(items, collect);
    // if (dude.sprite.collide(obstacles)){
    //   deadTime = Date.now();
    // }
    function collect(collector, collected){
      dude.sprite.scale += 0.15;
      collected.remove();
    }

};

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
