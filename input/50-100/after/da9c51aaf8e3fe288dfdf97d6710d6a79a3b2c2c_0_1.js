function writeDebugInfo() {
  document.getElementById('framecounter').innerHTML = "Frame Count: " + frameCount;
  document.getElementById('timer').innerHTML = "Time: " + (Date.now() - animationTimeStamp);
  document.getElementById('framerate').innerHTML = "Frame Rate: " + frameRate;
  document.getElementById('gamestate').innerHTML = "Game State: " + gameState;
}