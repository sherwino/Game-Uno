console.log("Animate.js is LOADED");
// 
// (function() {
// 	// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// 	// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
// 	// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
// 	// MIT license
//
//     var lastTime = 0;
//     var vendors = ['ms', 'moz', 'webkit', 'o'];
//     for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
//         window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
//         window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
//     }
//
//     if (!window.requestAnimationFrame)
//         window.requestAnimationFrame = function(callback, element) {
//             var currTime = new Date().getTime();
//             var timeToCall = Math.max(0, 16 - (currTime - lastTime));
//             var id = window.setTimeout(function() { callback(currTime + timeToCall); },
//               timeToCall);
//             lastTime = currTime + timeToCall;
//             return id;
//         };
//
//     if (!window.cancelAnimationFrame)
//         window.cancelAnimationFrame = function(id) {
//             clearTimeout(id);
//         };
// }());
//
// //ALL OF THE STUFF ABOVE IS CRAZY RIGHT NOW
//
// (function () {
//   var bgSprite,
//       thebg,
//       canvas;
//
//   function bgLoop () {
//     window.requestAnimationFrame(bgLoop);
//
//     bgSprite.update();
//     bgSprite.render();
//   }
//
// function sprite (options) {
//   var that = {},
//   frameIndex = 0,
//   tickCount = 0,
//   ticksPerFrame = options.ticksPerFrame || 0;
//   numberOfFrames = options.numberOfFrames || 1;
//
//
//
//   that.context = options.context;
//   that.width = options.width;
//   that.height = options.height;
//   that.image = options.image;
//   that.update = function () {
//       tickCount += 1;
//       if (tickCount > ticksPerFrame) {
//         tickCount = 0;
//           //if the current frame index is in range
//           if (frameIndex < numberOfFrames - 1){
//             // Go to the next frame
//             frameIndex += 1;
//           } else {
//             frameIndex = 0;
//           }
//         }
//       };
//   that.render = function () {
//     //clear the canvas
//     that.context.clearRect(0,0, that.width, that.height);
//
//     that.context.drawImage(
//       that.image,
//       frameIndex * that.width / numberOfFrames,
//       0,
//       that.width / numberOfFrames,
//       that.height,
//       0,
//       0,
//       that.width / numberOfFrames,
//       that.height);
//   };
//
//   return that;
// }
// //Get that canvas element
// canvas = document.getElementById("bgAnimation");
// canvas.width= 32;
// canvas.height= 60;
//
// //create a sprite sheet
// thebg = new Image();
//
//
// //create the sprite
// bgSprite = sprite({
//   context: canvas.getContext("2d"),
//   width: 600,
//   height: 60,
//   image: thebg,
//   numberOfFrames: 10,
//   ticksPerFrame: 1
// });
//
// //load sprite sheet
// thebg.addEventListener("load", bgLoop);
// thebg.src = "./img/character.png";
//
// } ());
