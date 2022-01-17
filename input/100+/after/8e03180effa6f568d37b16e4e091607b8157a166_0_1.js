function(data2) {
    currDJ = data2.room.metadata.current_dj;
    for (var i = 0; i < data2.users.length; i++) {
      if (data2.users[i].userid == currDJ) {
        var name = data2.users[i].name;
        var points = data2.users[i].points;
        for (var j = 0; j < countdownScore.length; j++) {
          if ((points < countdownScore[j]) && (points > (countdownScore[j] - 50))){
            bot.speak(countdownScore[j] - points);
          }
          else if (points == countdownScore[j]) {
            if (!scoreReached) {
              scoreReached = true;
              celebrate(name);
            }
          }
        }
      }
    }
  }