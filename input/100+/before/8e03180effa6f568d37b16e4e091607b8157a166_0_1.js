function(data2) {
    currDJ = data2.room.metadata.current_dj;
    for (var i = 0; i < data2.users.length; i++) {
      if (data2.users[i].userid == currDJ) {
        var name = data2.users[i].name;
        var points = data2.users[i].points;
        for (var i = 0; i < countdownScore.length; i++) {
          if ((points < countdownScore[i]) && (points > (countdownScore[i] - 50))){
            bot.speak(countdownScore[i] - points);
          }
          else if (points == countdownScore[i]) {
            if (!scoreReached) {
              scoreReached = true;
              celebrate(name);
            }
          }
        }
      }
    }
  }