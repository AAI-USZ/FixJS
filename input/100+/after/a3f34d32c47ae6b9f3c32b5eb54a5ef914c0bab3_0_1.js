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
      newTurn();
      gameState = "inputsliders"; 
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
   
    case "inputsliders":
      if (currentSliderX == true) {
        currentSliderX = false;
      }
      else {
        clearInterval(animationTimerID);
        gameState = "shotanimation";
      }
      //(currentSliderX == true) ? currentSliderX=false : gameState = "shotanimation"; clearInterval(animationTimerID);
      break;

    case "newlevel":
      currentSliderX=true;
      gameState = "shotanimation";
      clearInterval(animationTimerID);
      break;
  }
}