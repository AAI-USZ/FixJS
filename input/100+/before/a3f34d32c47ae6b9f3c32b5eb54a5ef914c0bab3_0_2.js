function drawMissAnim() {
  frameCount++;
  drawGameScreen();
  drawStatusBar();
  var elapsedTime = Date.now() - animationStartTimeStamp; 
  if (elapsedTime < ballShotTimeToGoal) {
    drawGoalie(shotanimation.direction,goalieStartingPosition.x,goalieStartingPosition.y);
    var ballXOffset = (elapsedTime / ballShotTimeToGoal) * (ballStartingPosition.x - goalieEndingPositions[shotanimation.direction].x); 
    var ballYOffset = (elapsedTime / ballShotTimeToGoal) * (ballStartingPosition.y - goalieEndingPositions[shotanimation.direction].y); 
    var ballSize = 100 - (75 * elapsedTime/ballShotTimeToGoal);
    drawBall(ballSize,ballStartingPosition.x - ballXOffset, ballStartingPosition.y - ballYOffset);
  }
  else if (elapsedTime > ballShotTimeToGoal && elapsedTime < totalAnimationDuration) {
    drawGoalie(shotanimation.direction,goalieStartingPosition.x,goalieStartingPosition.y);
  }
  else {
    clearInterval(animationTimerID);
    drawSliderBars();
    gameState = "newgame";
  }
  //keyword = keywords[Math.floor(Math.random()*keywords.length)];
  //drawStatusText("You Missed!","red");
}