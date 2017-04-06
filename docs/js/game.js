console.log("GAME.JS is loaded");

$(document).ready(function() {
  $("button.newGame").on("click", function () {
  $(".overlay").animate({opacity: '0.1'}, 1000);
  setTimeout(function(){
    $(".overlay").hide();
  }, 1200);

  startGame = true;
  }); //end of the onclick function

  //reset game via rotateToDirection
  $("button.playAgain").click(function(){
    window.location.href="./index.html";
  });

//this lets the selecter character to stay lit and adds a class that can be used later
//should create a test later that only lets one character get selected
  $("#charID1, #charID2, #charID3").on("click", function () {
    if ($(this).hasClass("clicked")) {
        $(this).stop().animate({opacity: '0.4'});
        $(this).toggleClass("clicked");
    } else {
    $(this).stop().animate({opacity: '0.99'}, 100);
    $(this).toggleClass("clicked");
    }
  });

  showHealthbar = function (val) {
    if (val === true && !healthShowing) {
      $(".healthOverlay").animate({opacity: '0.98'}, 1000);
      healthShowing = true;
    }
  };

  healthMonitor = function() {
    if (dude.health === 20){
      $("#p1").css("background", "url(./img/hero/h-health2.png)");
    }
    if (dude.health === 15){
      $("#p1").css("background", "url(./img/hero/h-health3.png)");
    }
    if (dude.health === 10){
      $("#p1").css("background", "url(./img/hero/h-health4.png)");
    }
    if (dude.health === 5){
      $("#p1").css("background", "url(./img/hero/h-health5.png)");
    }
    if (dude.health === 0){
      $("#p1").css("background", "url(./img/hero/h-health6.png)");
    }
    if (dude.health < 0) {
      $("#p1").css("background", "url(./img/hero/h-health7.png)");
      setTimeout(gameOver,3000);
    }
  };

  resetDamage = function () {
    if (bittenbyBee){
      console.log("resetting the bees ability to hit you");
      bittenbyBee = false;
    }
    if (stungbyBee){
      stungbyBee = false;
    }

    if(dragonCreated) {
      if(bittenbyDragon) {
        bittenbyDragon = false;
    }
  }

  }; //end of resetDamage

  //this is one value to change with difficulty, how often you take in damage
  setInterval(function(){
    resetDamage();
  }, 1000);

  npcsHurtYou = function (npcsAttack) {
    if (dude.health > -1 && !paused){
      dude.health = dude.health - npcsAttack;
      console.log(npcsAttack);
      console.log(dude.health);

    }
  };

  npcGenerator = function () {
    if (dude.sprite.position.x > 600 && !firstWaveComplete){
      createBees(5);
      firstWaveComplete = true;
    }
    if (dude.sprite.position.x > 1600 && !secondWaveComplete){
      createBees(10);
      secondWaveComplete = true;
    }
    if (dude.sprite.position.x > 2600 && !thirdWaveComplete){
      createBees(5);
      thirdWaveComplete = true;
    }
    if (dude.sprite.position.x > 3600 && !fourthWaveComplete){
      createBees(10);
      fourthWaveComplete = true;
    }
    if (dude.sprite.position.x > 4600 && !fifthWaveComplete){
      createBees(5);
      fifthWaveComplete = true;
    }
    if (dude.sprite.position.x > 5600 && !sixthWaveComplete){
      createBees(10);
      sixthWaveComplete = true;
    }
    if (dude.sprite.position.x > 8500 && !bossWaveComplete) {
      bossDragon();
      console.log("the dragons have been released");
      createBees(10);
      bossWaveComplete = true;
    }
    if (dude.sprite.position.x > 11500 && !finalWaveComplete) {
      createBees(10);
      finalWaveComplete = true;
    }
  };

//for flying enemies
  npcsChaseYou = function (npcGroup) {
    if (npcGroup.length > 0){
      for (i=0; i < npcGroup.length; i++) {
        npcGroup[i].attractionPoint(random(0.5, 1.2), dude.sprite.position.x, dude.sprite.position.y);
        npcGroup[i].collide(dude.sprite);
        //since the force keeps incrementing the speed you can
        //set a limit to it with maxSpeed
        npcGroup[i].maxSpeed = random(20, 50);
      }
    }
  };

//for boss
  bossChaseYou = function (boss) {
    if (dragonCreated) {
      boss.attractionPoint(0.2, 11700, dude.sprite.position.y);
      boss.collide(dude.sprite);
      // boss.rotateToDirection = true;
        //since the force keeps incrementing the speed you can
        //set a limit to it with maxSpeed
      boss.maxSpeed = 5;
    }
  };

gameOver =  function() {
    if (dude.health < 0 && !paused && startGame){
      console.log("Game Over Dude");
      startGame = false;
      $(".newGame").hide();
      $(".overlay").show();
      $(".overlay").animate({opacity: '0.95'}, 1000);
      $(".playAgain").show();
      theme.stop();
    }
  };

  //Controls the volume of the theme song as you move away from the title screen.
  //Later need to make this same if statment change the song to a boss song.
  gameMusic = function () {

    if (dude.sprite.position.x < 700) {
        theme.setVolume(0.1, 0, 1);
    } else if (dude.sprite.position.x > 700) {
        theme.setVolume(0.2, 0, 2);
      } else if (dude.sprite.position.x > 1000) {
          theme.setVolume(0.3, 0, 4);
        }
        if (dude.sprite.position.x > 10480 && !bossthemePlaying) {
          console.log("dude is near boss");
          theme.stop();
          bossTheme.play();
          bossthemePlaying = true;
        }
  }; //end of game music function

}); // end of the document.ready function

//playAgain Constructor Method




// arrow key game control test
// Jeremy Douglass -- 2017-03-16 -- p5.js 1.0.3
//
// var lcolor, rcolor, ucolor, dcolor;
//
// function setup() {
//   createCanvas(400, 400);
// }
//
// function draw() {
//   background(128);
//
//   lcolor = (keyIsDown(LEFT_ARROW)  ? color(255,  64, 255) : color(128));
//   rcolor = (keyIsDown(RIGHT_ARROW) ? color(255,  64,  64) : color(128));
//   ucolor = (keyIsDown(UP_ARROW)    ? color( 64, 255,  64) : color(128));
//   dcolor = (keyIsDown(DOWN_ARROW)  ? color( 64,  64, 255) : color(128));
//
//   lkey(0,height/3, width/3, height/3, 20);
//   rkey(2*(width/3), height/3, width/3, height/3, 20);
//   ukey(width/3, 0, width/3, height/3, 20);
//   dkey(width/3, 2*(height/3), width/3, height/3, 20);
// }
//
// function lkey(x,y,w,h,margin){
//   translate(x,y);
//   keyplate(w,h);
//   stroke(lcolor);
//   strokeWeight(10);
//   rect(margin, margin, w - 2*margin, h - 2*margin);
//   translate(-x,-y);
// }
// function rkey(x,y,w,h,margin){
//   translate(x,y);
//   keyplate(w,h);
//   stroke(rcolor);
//   strokeWeight(10);
//   ellipse(w/2, h/2, w - 1.5*margin, h - 1.5*margin);
//   translate(-x,-y);
// }
// function ukey(x,y,w,h,margin){
//   translate(x,y);
//   keyplate(w,h);
//   stroke(ucolor);
//   strokeWeight(10);
//   triangle(w/2, margin, w - margin, h - margin, margin, h - margin);
//   translate(-x,-y);
// }
// function dkey(x,y,w,h,margin){
//   translate(x,y);
//   keyplate(w,h);
//   stroke(dcolor);
//   strokeWeight(10);
//   line(margin,margin, w - margin, h - margin);
//   line(w - margin, margin, margin, h - margin);
//   translate(-x,-y);
// }
// function keyplate(w,h){
//   fill(64);
//   strokeWeight(0);
//   rect(0, 0, w, h);
// }

// var mySound;
//

//   function preload() {
//     mySound = loadSound('./aud/kens.mp3');
//   }
//
//   function setup() {
//     mySound.setVolume(0.2);
//     mySound.play();
//   }
