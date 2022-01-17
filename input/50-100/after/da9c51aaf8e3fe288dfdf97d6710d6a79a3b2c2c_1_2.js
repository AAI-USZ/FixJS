function drawEndScreen() {
  var canv = document.getElementById('gamecanvas');  
  var ctx = canv.getContext('2d');  
  clearInterval(intervalTimerID);   // will stop the function from running on interval
  canv.removeEventListener('click',drawEndScreen,false);
  ctx.drawImage(endScreen,0,0);
  canv.addEventListener('click',drawHomeScreen,false);
}