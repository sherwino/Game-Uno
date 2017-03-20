console.log("Animate.js is LOADED");

//offline testing using these libraries
//"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --user-data-dir="C:/Chrome dev session2" --disable-web-security

//this js file is for the hero constructor and associated sprites, and movement functions


var dude, obstacles, ground, dot, items, marker, thingImg, platformImg, markerImg, gravityController, projectiles, gravity, bgImg, movementLimits, mapWidth = 10906;

function Hero (name) {
  this.name = name;
  this.x = 200;
  this.y = height/2;
  this.jump = -10;
  this.speed = 7;
  this.sprite = createSprite(this.x, this.y, 60, 60);

}



function setup () {
  createCanvas(1024,768);
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
  platformImg = loadImage("./img/collision.png");
  thingImg = loadImage("./img/thing.gif");
  markerImg = loadImage("./img/marker.png");

  obstacles = new Group ();
  items = new Group ();
  projectiles = new Group ();

  for (var i=0; i<20; i++) {
  var box = createSprite(random(800, 2000), random(0,height), 100, 100);
  obstacles.add(box);
  }

  ground = createSprite(0, 688);
  ground.addImage(platformImg);
  ground.immovable = true;
  // obstacles.add(ground);
  ground.debug = true;



for (i=0; i<10; i++) {
  dot = createSprite(random(90, 6000), random(0,height));
  dot.addImage(thingImg);
  dot.debug = true;
  items.add(dot);
  }

  textSize(50);

} //end of the setup function



function draw () {
  clear();
  image(bgImg, -400,0);
  fill(255);
  text(keyCode, 33,65);
  movementLimits();
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

    if (keyWentDown("c")){
      marker = createSprite(dude.sprite.position.x, dude.sprite.position.y);
      marker.addImage(markerImg);
      marker.setSpeed(10+dude.sprite.getSpeed(), dude.sprite.rotation);
      marker.life = 800;
      projectiles.add(marker);
      }

    if (dude.sprite.position.x > mapWidth) {
      dude.sprite.position.x = mapWidth;
      dude.sprite.velocity.x = 0;
    }

    if (dude.sprite.position.x < -330) {
      dude.sprite.position.x = -330;
      dude.sprite.velocity.x = 0;
    }

    if (dude.sprite.position.y > height - 80) {
      dude.sprite.position.y = height - 80;
      dude.sprite.velocity.y = 0;
    }

    if (dude.sprite.position.y < 40) {
      dude.sprite.position.y = 40;
      dude.sprite.velocity.y = 0;
    }

    dude.sprite.collide(obstacles);
    dude.sprite.collide(projectiles);
    projectiles.collide(obstacles);
    dude.sprite.overlap(items, collect);

    function collect(collector, collected){
      dude.sprite.scale += 0.15;
      collected.remove();
    }
};

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
