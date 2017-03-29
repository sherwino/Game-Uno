console.log("Animate.js is LOADED");

//offline testing using these libraries
//"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --user-data-dir="C:/Chrome dev session2" --disable-web-security

//this js file is for the hero constructor and associated sprites, and movement functions


var dude, obstacles, lastPressed, box, collect, jumping, markerMissle, ground, dot, items, marker, thingImg, platformImg, markerImg, gravityController, projectiles, gravity = 15, bgImg, movementLimits, mapWidth = 12085;
var theme, npcAttack, runSound, loadMusic;

function Hero (name) {
  this.name = name;
  this.x = 200;
  this.y = height/2;
  this.health = 5;
  this.jump = -10;
  this.speed = 7;
  this.sprite = createSprite(this.x, this.y, 60, 60);

}

function preload() {

      bgImg = loadImage("./img/bg1.jpg");
      // platformImg = loadImage("./img/floor_0_0.png");
      thingImg = loadImage("./img/ss.png");
      markerImg = loadImage("./img/marker.png");
      running = loadSound('./aud/running.mp3');
}

function setup () {
  createCanvas(1024,768);
  dude = new Hero ("Bob");
  theme = loadSound('./aud/kens.mp3', loadMusic);
  running.setVolume(0.3);
  // running = loadSound('./aud/running.mp3');



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

  setInterval(function () {
    for (var i=0; i<4; i++) {
    box = createSprite(random(800, 5000), random(0,height), 100, 100);
    box.velocity.x -= random(5, 10);
    obstacles.collide(dude.sprite);
    obstacles.add(box);
    box.life = 500;

      } //close for loop
    }, 2000);


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
    if (keyDown(LEFT_ARROW) && !running.isPlaying() && dude.sprite.position.y > height - 40 ){
      running.pan(-0.5);
      running.loop();
    } else if (keyDown(RIGHT_ARROW) && !running.isPlaying()&& dude.sprite.position.y > height - 40 ){
      running.pan(0.5);
      running.loop();
    }
  }; //end of the runSound function

  loadMusic = function (){
    if (theme.isPlaying()){
    theme.setVolume(0);
    theme.play();
    theme.setVolume(0.01, 0, 5);
  } //end of if statement
}; //end of the loadMusic function


} //end of the setup function

// function gravityController (dude) {
//   gravity += 2;
//  if(obstacles.overlapPixel(dude.sprite.position.x, dude.sprite.position.y+30)===false){
//    dude.sprite.velocity.y = gravity;
//       console.log("the if loop is running");
// }
//
 // while(ground.overlapPixel(dude.sprite.position.x, dude.sprite.position.y+30)){
 //   dude.sprite.position.y--;
 //   dude.sprite.velocity.y = 0;
 //   console.log("the while loop is running");
 //   }
// dude.sprite.velocity.y = 15;
//
//
// }

// var deadTime = 0;
// var startTime = new Date().getTime();
// var elapsedTime = startTime - deadTime;


// function pauseMe () {
//    if(keyDown(112)) {
//      paused = true;
//    } else {
//      paused = false;
//    }
//     return paused;
//  }

if (paused === false) {
    }     //end of the pause statement

  pauseMe();

  pauseMe = function () {
  for (i=0; i < allSprites.length; i++)
  if(mouseIsPressed)
    allSprites[i].play();
  else
    allSprites[i].stop();
  };

    // text(elapsedTime, -300, 125);

const G = 2; //万有引力定数

class Ball {
  constructor(location, velocity, mass){
    //位置
    this.location = location;
    //速度
    this.velocity = velocity;
    //加速度
    this.acceleration;
    //質量
    this.mass = mass;
    this.init();
  }
  applyForce(force){
    let _force = p5.Vector.div(force, this.mass);
    this.acceleration.add(_force);
  }
  getFriction(){
    let friction = this.velocity.copy();
    friction.normalize();
    friction.mult(-0.1);
    return friction;
  }
  init(){
    this.acceleration = this.velocity.copy();
    this.acceleration.normalize();
    this.acceleration.mult(5);
  }
  attract(ball){
    let force = p5.Vector.sub(this.location, ball.location);
    let distance = force.mag();
    if(distance < 5) distance = 5;
    if(distance > 25) distance = 25;
    force.normalize();
    let strength = (G * this.mass * ball.mass) / ( distance * distance );
    force.mult(strength);
    return force;
  }
  update(){
    let friction = this.getFriction();
    this.applyForce(friction);
    this.velocity.limit(5);
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
  }
  draw(){
    let force = p5.Vector.sub(createVector(window.innerWidth, window.innerHeight), this.location);
    let distance = force.mag() * 0.1;
    fill(distance, 80, 100);
    ellipse(this.location.x, this.location.y, this.mass * 2, this.mass * 2);
  }
}

class Attractor {
  constructor(){
    this.location = createVector(window.innerWidth/2, window.innerHeight/2);
    this.mass = 200;
  }
  draw(){
    fill(50, 80, 100);
    ellipse(this.location.x, this.location.y, this.mass / 2, this.mass / 2);
  }
  attract(ball){
    let force = p5.Vector.sub(this.location, ball.location);
    let distance = force.mag();
    if(distance < 5) distance = 5;
    if(distance > 25) distance = 25;
    force.normalize();
    let strength = (G * this.mass * ball.mass) / ( distance * distance );
    force.mult(strength);
    return force;
  }
}

let ball = [];
let count = 50;
let a;

function setup(){
  createCanvas(window.innerWidth, window.innerHeight);
  colorMode(HSB, 100);
  for(var i = 0; i < count; i++){
    let angle = Math.PI / 180 * (360 / count * i);
    let location = createVector(window.innerWidth / 2 + 60 * Math.cos(angle), window.innerHeight / 2 + 60 * Math.sin(angle));
    let velocity = createVector(Math.cos(angle + Math.PI / 180 * 45), Math.sin(angle + Math.PI / 180 * 45));
    velocity.mult(10);
    ball.push(new Ball(location, velocity, Math.random()*10 + 1));
  }

  a = new Attractor();
  noStroke();
}

function draw(){

  background(100,0,100,10);

  a.draw();

  for(var i = 0; i < count; i++){
    let force = a.attract(ball[i]);
    ball[i].applyForce(force);
    for(var j = 0; j < count; j++){
      if(i !== j){
        let _force = ball[i].attract(ball[j]);
        ball[i].applyForce(_force);
      }
    }
    ball[i].update();
    ball[i].draw();
  }
}

function draw () {
  if (!paused) {
  clear();
  image(bgImg, -400,0);

  fill(255);
  text("Game-Uno", -300, 50);
  text("by Sherwino", -300, 75);
  text(keyCode, -300, 100);
  dude.sprite.velocity.y += 1;
  movementLimits();
  obstacles.displace(projectiles);
  dude.sprite.collide(obstacles);
  dude.sprite.collide(projectiles);

  drawSprites();
  } //close the pause function


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
      console.log("High Punch");
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
  // dude.sprite.velocity.y = 15;
  jumping = false;
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

// function gravityController (dude) {
//   gravity += 2;
//  if(obstacles.overlapPixel(dude.sprite.position.x, dude.sprite.position.y+30)===false){
//    dude.sprite.velocity.y = gravity;
//       console.log("the if loop is running");
// }
//
 // while(ground.overlapPixel(dude.sprite.position.x, dude.sprite.position.y+30)){
 //   dude.sprite.position.y--;
 //   dude.sprite.velocity.y = 0;
 //   console.log("the while loop is running");
 //   }
// dude.sprite.velocity.y = 15;
//
//
// }
