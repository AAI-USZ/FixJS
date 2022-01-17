function drawSliderAnim() {
  frameCount++;
  drawGameScreen();
  drawStatusBar();
  drawSliderBars();
  $("#sliderX").attr("value",sliderClickPosition.x);
  $("#sliderY").attr("value",sliderClickPosition.y);
  if (currentSliderX == true) { 
    sliderClickPosition.x =  25 + ((slider.speed / 20) * (Date.now() - animationStartTimeStamp)) % 450;
    drawBall(40, sliderClickPosition.x, 250 );
  }
  else {
  }
}