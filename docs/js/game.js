console.log("GAME.JS is loaded");

//Newgame Constructor Method

function CAMB () {
  this.score = 0;
  this.lives = 0;
  this.player = "";
  this.wins = false;
  this.dies = false;


} //closes Constructor function

// $(document).ready(function() {
// 
//   $(".overlay").on("click", function () {
//   $(".overlay").animate ({opacity: '0.1'}, 1000);
//
//   $(".overlay").hide(1500);
//   $(".titleText").show(1000);
// }); //end of the onclick function
//
// }); // end of the document.ready function