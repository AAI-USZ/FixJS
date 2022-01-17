function(user, callback){
          var team = room.getTeams()[room.getUserToTeam()[user]];
          if (started && !buzzed && team && !team.getBuzzed()) {
            clearTimeout(questionTimeout);
            answering = true;
            currentUser = user;
            room.getChannel().onBuzz(app.getUsers()[user]);
            team.setBuzzed(true);
            console.log("PAUSING");
            pauseReading();
            answerTimeout = setTimeout(function(){
              answerTimer(user);
            }, app.Constants.Multiplayer.Game.ANSWER_TIMEOUT);
            buzzed = true;
            numBuzzes++;
            callback(true);
          } else {
            callback(false);
          }
        }