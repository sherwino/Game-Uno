console.log("Animate.js is LOADED");

//offline testing using these libraries
//"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --user-data-dir="C:/Chrome dev session2" --disable-web-security

//this js file is for the hero constructor and associated sprites, and movement functions


var dude, obstacles, ground, items, projectiles, GRAVITY = 1, bgImg, mapWidth = 8520;

function Hero (name) {
  this.name = name;
  this.x = 200;
  this.y = height/2;
  this.jump = -10;
  this.sprite = createSprite(this.x, this.y, 800, 600);

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
  dude.debug = true;

  bgImg = loadImage("./img/bg.jpg");

  obstacles = new Group ();
  items = new Group ();

  //
  // for (var i=0; i<4; i++) {
  // var box = createSprite(random(0, width), random(0,height));
  // box.addAnimation("normal", "./img/character.png");
  // obstacles.add(box);
  // }

  ground = createSprite(random(0, width),500);
  ground.addAnimation("normal", "./img/platform.png");

  dude.sprite.depth = 20;
  dude.sprite.setCollider("circle", 30, 30, 30);

for (i=0; i<10; i++) {
  var dot = createSprite(random(0, width), random(0,height));
  dot.addAnimation("normal", "./img/thing.gif");
  items.add(dot);
  }

  textSize(50);
}



function draw () {
  clear();
  image(bgImg, -400,0);
  drawSprites();

  fill(255);
  text(keyCode, 33,65);

  camera.position.x = dude.sprite.position.x;
  camera.position.y = height/2; //maybe
  camera.zoom = 1;

  dude.movementLimits();
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
    dude.sprite.velocity.x = 7;

  }

  if (keyDown(LEFT_ARROW)) {
    dude.sprite.changeAnimation("running");
    dude.sprite.mirrorX(-1);
    dude.sprite.velocity.x = -7;
  }

  dude.sprite.collide(obstacles);
  dude.sprite.overlap(items, collect);

  function collect(collector, collected){
    dude.sprite.scale += 0.15;  
    collected.remove();
  }

  //Or check a point against the pixels of a sprite animation or image
 //if the bottom of the triangle is not overlapping with the non transparent pixels
 //of the platform make it fall
 if(ground.overlapPixel(dude.x, dude.y+30)===false){
   dude.sprite.velocity.y += GRAVITY;
}
 //if the bottom of the triangle is overlapping the non transparent pixels
 //of the platform move it up one pixel until it doesn't overlap anymore
 while(ground.overlapPixel(dude.x, dude.y+30)){
   dude.y--;
   dude.sprite.velocity.y = 0;
   }





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
