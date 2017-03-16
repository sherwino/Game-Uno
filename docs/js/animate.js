console.log("Animate.js is LOADED");

//offline testing using these libraries
//"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --user-data-dir="C:/Chrome dev session2" --disable-web-security

//this js file is for the hero constructor and associated sprites, and movement functions


var dude, runsprites, bgImg, mapWidth = 8520;

function Hero (name) {
  this.name = name;
  this.x = 200;
  this.y = height/2;
  this.xspeed = 0;
  this.gravity = 15;
  this.jump = -7 * 0.75;
  this.runsprites = createSprite(this.x, this.y, 800, 600);

  this.show = function () {
    fill(255);
    ellipse(this.x, this.y, 32, 32);
  };


  this.dir = function(x, y) {
    this.xspeed = x;
    this.gravity = y;
  };

  this.update = function () {

    this.x = this.x + this.xspeed;
    this.y = this.y + this.gravity *1.9;

    if (this.x > mapWidth - 780) {
      this.x = mapWidth - 780;
      this.xspeed = 0;
    }

    if (this.x < 0) {
      this.x = 0;
      this.xspeed = 0;
    }

    if (this.y > height - 80) {
      this.y = height - 80;
      this.gravity = 0;
    }

    if (this.y < 40) {
      this.y = 40;
      this.gravity = 0;
    }

    dude.runsprites.position.x = this.x;
    dude.runsprites.position.y = this.y;
  };
}



function setup () {
  createCanvas(800,600);
  dude = new Hero ();
  textSize(50);
  dude.runsprites.addAnimation("standing", "./img/hero/heroguy9.png", "./img/hero/heroguy9.png");
  dude.runsprites.addAnimation("jumping", "./img/hero/heroguy_jump1.png");
  dude.runsprites.addAnimation("crouching", "./img/hero/heroguy_crouch1.png");
  dude.runsprites.addAnimation("running", "./img/hero/heroguy1.png", "./img/hero/heroguy8.png");
  dude.runsprites.addAnimation("spinning", "./img/hero/heroguy1.png", "./img/hero/heroguy8.png");
  bgImg = loadImage("./img/bg.jpg");
  // dude.setCollider("circle", 0,0,20);

}



function draw () {
  clear();
  image(bgImg, -400,0);
  dude.update();
  dude.show();
  drawSprites();
  text(keyCode, 33,65);
  camera.position.x = dude.x;
  camera.position.y = height/2;
  camera.zoom = 1;

  if (keyDown(UP_ARROW)) {
    dude.dir(0, dude.jump);
    dude.runsprites.changeAnimation("jumping");
    // dude.dir(0, dude.gravity);

  }

  if (keyDown(DOWN_ARROW)) {
    dude.runsprites.changeAnimation("crouching");

  }
  if (keyDown(RIGHT_ARROW)) {
    dude.x += 7;
    dude.runsprites.changeAnimation("running");
    dude.runsprites.mirrorX(1);
  }
  if (keyDown(LEFT_ARROW)) {
    dude.x -= 7;
    dude.runsprites.changeAnimation("running");
    dude.runsprites.mirrorX(-1);
  }
  // if (gameStarted == true){
  // setTimeout(function (){
  //
  //   camera.position.y = dude.y;
  //   camera.zoom = 4;
  //
  // }, 3000);
}

  // function keyPressed () {
      // if (keyDown(UP_ARROW)) {
      //   dude.dir(0, dude.jump);
      //   // dude.dir(0, dude.gravity);
      //   dude.runsprites.scale += 0.05;
      // }
      // if (keyDown(DOWN_ARROW)) {
      //   dude.dir(0, 3);
      //   dude.runsprites.scale -= 0.05;
      // }
      // if (keyDown(RIGHT_ARROW)) {
      //   dude.dir(7, 0);
      //   dude.runsprites.changeAnimation("running");
      //   dude.runsprites.mirrorX(1);
      // }
      // if (keyDown(LEFT_ARROW)) {
      //   dude.dir(-7, 0);
      //   dude.runsprites.changeAnimation("running");
      //   dude.runsprites.mirrorX(-1);
      // }
  // } //ends the keyPressed function

  function keyReleased() {
    dude.xspeed = 0;
    dude.gravity = 15;
    dude.runsprites.changeAnimation("standing");
    return false; // prevent any default behavior
  }

//-------------------------
// setTimeout(function (){
//   camera.position.y = height/2;
//   camera.zoom = 1;
// }, 3000);
//------POWER UP------------
//-----SUPER SPEED---------this.xspeed += x; this.gravity += y;
//-----SUPER SIZE---------    dude.runsprites.scale += 0.05;     dude.runsprites.scale -= 0.05;

// this.showHero = function () {
// }
//
// }
//
// function draw() {
//   background(255,255,255);
//
//   //up and down keys to change the scale
//   //note that scaling the image quality deteriorates
//   //and scaling to a negative value flips the image
//   if(keyIsDown(UP_ARROW))
//     ghost.scale += 0.05;
//   if(keyIsDown(DOWN_ARROW))
//     ghost.scale -= 0.05;
//
//   //draw the sprite
//   drawSprites();
// }







//
// width: 56px;
// height: 60px;
