console.log("Animate.js is LOADED");

//offline testing using these libraries
//"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --user-data-dir="C:/Chrome dev session2" --disable-web-security

//this js file is for the hero constructor and associated sprites, and movement functions


var dude, obstacles, ground, dot, items, thingImg, platformImg, gravityController, projectiles, gravity, bgImg, mapWidth = 8520;

function Hero (name) {
  this.name = name;
  this.x = 200;
  this.y = height/2;
  this.jump = -10;
  this.speed = 7;
  this.sprite = createSprite(this.x, this.y, 60, 60);

  this.movementLimits = function () {
    this.x = this.x + this.sprite.velocity.x;
    this.y = this.y + this.sprite.velocity.y;

    if (this.x > mapWidth - 780) {
      this.x = mapWidth - 780;
      this.sprite.velocity.x = 0;
    }

    if (this.x < 0) {
      this.x = 0;
      this.sprite.velocity.x = 0;
    }

    if (this.y > height - 80) {
      this.y = height - 80;
      this.sprite.velocity.y = 0;
    }

    if (this.y < 40) {
      this.y = 40;
      this.sprite.velocity.y = 0;
    }

    this.sprite.position.x = this.x;
    this.sprite.position.y = this.y;

  }; //end of the movementLimits function

}



function setup () {
  createCanvas(800,600);
  dude = new Hero ("Bob");

  dude.sprite.addAnimation("standing", "./img/hero/heroguy9.png", "./img/hero/heroguy9.png");
  dude.sprite.addAnimation("jumping", "./img/hero/heroguy_jump1.png");
  dude.sprite.addAnimation("crouching", "./img/hero/heroguy_crouch1.png");
  dude.sprite.addAnimation("running", "./img/hero/heroguy1.png", "./img/hero/heroguy8.png");
  dude.sprite.addAnimation("spinning", "./img/hero/heroguy1.png", "./img/hero/heroguy8.png");
  dude.sprite.addAnimation("hipunch", "./img/hero/heroguy_hp1.png");
  dude.sprite.addAnimation("lowpunch", "./img/hero/heroguy_lp.png");
  dude.sprite.depth = 20;
  dude.sprite.debug = true;

  bgImg = loadImage("./img/bg.jpg");
  platformImg = loadImage("./img/collisionold.png");
  thingImg = loadImage("./img/thing.gif");

  obstacles = new Group ();
  items = new Group ();

  for (var i=0; i<20; i++) {
  var box = createSprite(random(800, 2000), random(0,height), 100, 100);
  obstacles.add(box);
  }

  ground = createSprite(0, 550);
  ground.addImage(platformImg);
  // obstacles.add(ground);
  ground.debug = true;


for (i=0; i<10; i++) {
  dot = createSprite(random(0, 2000), random(0,height));
  dot.addImage(thingImg);
  dot.debug = true;
  items.add(dot);
  }

  textSize(50);

} //end of the setup function



function draw () {
  clear();
  image(bgImg, -400,0);
  // dude.movementLimits();

  fill(255);
  text(keyCode, 33,65);

//camera movements and their restrictions
  if (dude.sprite.position.x > mapWidth - 780) {
    camera.position.x = mapWidth - 780;
  } else if (dude.sprite.position.x < 100) {
    camera.position.x = 100;
  } else {
    camera.position.x = dude.sprite.position.x;
  }
  camera.position.y = height/2; //maybe
  camera.zoom = 1;



  if (keyDown(UP_ARROW)) {
    dude.sprite.changeAnimation("jumping");
    dude.sprite.velocity.y = dude.jump; //maybe
  }

  if (keyDown(DOWN_ARROW)) {
    dude.sprite.changeAnimation("crouching");
  }

  if (keyDown(RIGHT_ARROW)) {
    dude.sprite.changeAnimation("running");
    dude.sprite.mirrorX(1);
    dude.sprite.velocity.x = dude.speed;

  }

  if (keyDown(LEFT_ARROW)) {
    dude.sprite.changeAnimation("running");
    dude.sprite.mirrorX(-1);
    dude.sprite.velocity.x = -dude.speed;
  }

  if (keyIsDown(90)) {
    dude.sprite.changeAnimation("hipunch");
    console.log("High Punch");
  }

  if (keyDown(88)) {
    dude.sprite.changeAnimation("lowpunch");
    console.log("Low Punch");
  }


  dude.sprite.collide(obstacles);
  dude.sprite.overlap(items, collect);

  function collect(collector, collected){
    dude.sprite.scale += 0.15;
    collected.remove();
  }
drawSprites();
// function gravityController (dude) {
//   gravity += 2;
//  if(obstacles.overlapPixel(dude.sprite.position.x, dude.sprite.position.y+30)===false){
//    dude.sprite.velocity.y = gravity;
//       console.log("the if loop is running");
// }
//
 while(ground.overlapPixel(dude.sprite.position.x, dude.sprite.position.y+30)){
   dude.sprite.position.y--;
   dude.sprite.velocity.y = 0;
   console.log("the while loop is running");
   }
// dude.sprite.velocity.y = 15;
//
//
// }





} //end of the draw function



function keyReleased() {
  dude.sprite.velocity.x = 0;
  dude.sprite.velocity.y = 15;
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



start() {
              this.interval = setInterval(this.draw.bind(this), 18, this.ctx);
          }
          pause() {
              clearInterval(this.interval);
              this.interval = undefined;
          }
          gameOver() {
              clearInterval(this.interval);
              this.interval = undefined;

              handleKeyPress(e) {
                             let code = e.keyCode;
                             switch (code) {
                                 case 32:
                                     this.interval ? this.pause() : this.start();
                                     break;
                                 case 13:
                                     this.restart();
                                     break;
                                 case 37:
                                     this.doodle.dx = -5;
                                     break;
                                 case 39:
                                     this.doodle.dx = 5;
                                     default: return null;
                             }
                         }
