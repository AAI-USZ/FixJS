function draw() {
  frameCount ++;
     
  //ctx.globalCompositeOperation = 'destination-over';  
  var ctx = document.getElementById('gamecanvas').getContext('2d');  
  ctx.clearRect(0,0,500,500); // clear canvas  
   
  ctx.drawImage(gameScreen,0,0);

  ctx.save();
  //ctx.globalAlpha = 0.5;
  ctx.translate(goalieStartingPosition['x'],goalieStartingPosition['y']);
  ctx.drawImage(goalieReadyPosition,-20,-30,40,60);  
  ctx.restore();  

  ctx.save();
  //ctx.globalAlpha = 0.5;
  ctx.translate(ballStartingPosition['x'],ballStartingPosition['y']);
  ctx.rotate(Math.PI * 2 * frameCount / frameRate);
  ctx.drawImage(ball,-50,-50,100,100);  
  ctx.restore();  

  drawStatusBar();

  ctx.font = "bold 25px sans-serif";
  ctx.fillText("You Missed!",200,200); 
  /*if (frameCount == 60) {
    clearInterval(intervalTimerID);
  } */
}