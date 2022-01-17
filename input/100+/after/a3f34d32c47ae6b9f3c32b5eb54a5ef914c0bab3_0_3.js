function drawSliderAnim() {
  frameCount++;
  drawGameScreen();
  drawStatusBar();
  drawSliderBars();
  $("#sliderX").attr("value",sliderClickPosition.x);
  $("#sliderY").attr("value",sliderClickPosition.y);
  if (currentSliderX == true) { 
    sliderClickPosition.x =  (slider.speed / 20) * (Date.now() - animationStartTimeStamp) % 800;
    if (sliderClickPosition.x > 400) {
      sliderClickPosition.x = 800 - sliderClickPosition.x;
    }
    drawBall(40, sliderClickPosition.x + 50, 250 );
  }
  else {
    sliderClickPosition.y =  (slider.speed / 20) * (Date.now() - animationStartTimeStamp) % 800;
    if (sliderClickPosition.y > 400) {
      sliderClickPosition.y = 800 - sliderClickPosition.y;
    }
    drawBall(40, sliderClickPosition.x + 50, 250 );
    drawBall(40, 250, 50 + sliderClickPosition.y);
  }
}