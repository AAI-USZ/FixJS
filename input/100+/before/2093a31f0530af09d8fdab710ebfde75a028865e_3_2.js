function(user){
          var team = room.getTeams()[room.getUserToTeam()[user]];
          if (team && !team.getBuzzed()) {
            clearTimeout(questionTimeout);
            answering = true;
            currentUser = user;
            room.getChannel().onBuzz(app.getUsers()[user]);
            team.setBuzzed(true);
            pauseReading();
            answerTimeout = setTimeout(function(){
              answerTimer(user);
            }, app.Constants.Multiplayer.Game.ANSWER_TIMEOUT);
            buzzed = true;
            numBuzzes++;
          }
        }