function newTurn() {
  currentSliderX = true;
  shotanimation = {"type":"missed","curved":false,"direction":"hardleft"};
  sliderClickPosition = {"x":0,"y":0};
  animationStartTimeStamp = Date.now();
  animationTimerID = setInterval(drawSliderAnim, 1000 / frameRate);   
}