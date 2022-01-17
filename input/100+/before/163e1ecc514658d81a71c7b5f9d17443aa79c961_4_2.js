function startClicked() {
  width=40*document.getElementById('width').value;
  height=40*document.getElementById('height').value;
  rainFactor=document.getElementById('rain').value;
  killFactor=document.getElementById('kill').value;
  eatFactor=document.getElementById('eat').value;
  drinkFactor=document.getElementById('drink').value;
  initialGreen=document.getElementById('green').value;
  initialRed=document.getElementById('red').value;
  initialWater=document.getElementById('water').value;
  g_init(width,height,30,Array('gray.png','red.png','water.png','green.png','eye.png'),init,updateWide);
}