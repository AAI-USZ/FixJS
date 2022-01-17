function(json) {
    if(json.example && query.length > 0){
      bot.speak(json.example && query.length > 0);
    }
    else {
      bot.speak("I don't have an example of that.");
    }
  }