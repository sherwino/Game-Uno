console.log("Animate.js is LOADED");

//offline testing using these libraries
//"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --user-data-dir="C:/Chrome dev session2" --disable-web-security

//this js file is for the hero constructor and associated sprites, and movement functions


var dude, runsprites, bgImg;

function Hero (name) {
  this.name = name;
  this.x = width/2;
  this.y = height/2;
  this.xspeed = 0;
  this.gravity = 15;
  this.jump = -7;
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

    // if (this.x > width) {
    //   this.x = width;
    //   this.xspeed = 0;
    // }
    //
    // if (this.x < 0) {
    //   this.x = 0;
    //   this.xspeed = 0;
    // }

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
  dude.runsprites.addAnimation("running", "./img/hero/heroguy1.png", "./img/hero/heroguy8.png");
  dude.runsprites.addAnimation("spinning", "./img/hero/heroguy1.png", "./img/hero/heroguy8.png");
  bgImg = loadImage("./img/bg.jpg");
  // dude.setCollider("circle", 0,0,20);

}


function draw () {
  clear();
  image(bgImg, 0,0);
  dude.update();
  dude.show();
  drawSprites();
  text(keyCode, 33,65);
  camera.position.x = dude.x;
  camera.position.y = height/2;
}

  function keyPressed () {
      if (keyCode === UP_ARROW) {
        dude.gravity = -7;
        // dude.dir(0, dude.jump);
        // dude.dir(0, dude.gravity);
        dude.runsprites.scale += 0.05;
      } else if (keyCode === DOWN_ARROW) {
        dude.dir(0, 3);
        dude.runsprites.scale -= 0.05;
      } else if (keyCode === RIGHT_ARROW) {
        dude.dir(2, 0);
        dude.runsprites.changeAnimation("running");
        dude.runsprites.mirrorX(1);
      } else if (keyCode === LEFT_ARROW) {
        dude.dir(-2, 0);
        dude.runsprites.changeAnimation("running");
        dude.runsprites.mirrorX(-1);
      }
  } //ends the keyPressed function

  function keyReleased() {
    dude.xspeed = 0;
    dude.gravity = 15;
    dude.runsprites.changeAnimation("standing");
    return false; // prevent any default behavior
  }


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
