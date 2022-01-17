function drawmain() {
  intervalTimerID = setInterval(draw, 1000 / frameRate);   
  var canv = document.getElementById('gamecanvas');  
  canv.removeEventListener('click',drawmain,false);
  canv.addEventListener('click',drawEndScreen,false);
}