function drawHomeScreen() {
  var canv = document.getElementById('gamecanvas');  
  var ctx = canv.getContext('2d');  
  canv.removeEventListener('click',drawHomeScreen,false);
  ctx.drawImage(homeScreen,0,0);
  canv.addEventListener('click',drawmain,false);
}