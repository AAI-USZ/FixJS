function canvasMouseClickHandler(e) {
 
  switch(gameState) {
    case "homescreen":
      if (hitHomePlayButton(e)) {
        newGame();
        gameState = "newgame";
      }
      else if (hitHomeViewHighScoresButton(e)) {
        writeHighScores();
        gameState = "highscoresscreen";  
      } 
      break;
   
    case "endscreen":
      if (hitEndPlayAgainButton(e)) {
        newGame();
        gameState = "newgame";
      }
      else if (hitEndViewHighScoresButton(e)) {
        writeHighScores();
        gameState = "highscoresscreen";  
      } 
      break;

    case "highscoresscreen":
      drawHomeScreen();
      gameState = "homescreen"; 
      break;

    case "newgame":
      currentSliderX = true;
      sliderClickPosition = {"x":0,"y":0};
      drawGoalie("sitting",goalieStartingPosition.x,goalieStartingPosition.y);
      drawBall(100,ballStartingPosition.x,ballStartingPosition.y);
      gameState = "slideranimationX"; 
      break;

    case "shotanimation":
      var randomPosition = positionKeyWords[Math.floor(Math.random() * positionKeyWords.length)]; 
      shotanimation = {"type":"missed","curved":false,"direction":randomPosition};
      animationStartTimeStamp = Date.now();
      if (shotanimation.type == "missed") {
        animationTimerID = setInterval(drawMissAnim, 1000 / frameRate);   
      }
      else if (shotanimation.type == "goal") {
        animationTimerID = setInterval(drawGoalAnim, 1000 / frameRate);   
      }
      gameState = "inanimation"; 
      break;
   
    case "slideranimationX":
      animationStartTimeStamp = Date.now();
      animationTimerID = setInterval(drawSliderAnim, 1000 / frameRate);   
      gameState = "slideranimationY";
      //(currentSliderX == true) ? currentSliderX=false : gameState = "shotanimation"; clearInterval(animationTimerID);
      break;

    case "slideranimationY":
      currentSliderX=true;
      gameState = "shotanimation";
      clearInterval(animationTimerID);
      break;
  }
}