function(user){
          var team = room.getTeams()[room.getUserToTeam()[user]];
          if (team && !team.buzzed) {
            clearTimeout(questionTimeout);
            answering = true;
            currentUser = user;
            room.getChannel().onBuzz(app.getUsers()[user]);
            team.buzzed = true;
            pauseReading();
            answerTimeout = setTimeout(answerTimeout, app.Constants.Multiplayer.Game.ANSWER_TIMEOUT);
            buzzed = true;
            numBuzzes++;
          }
        }