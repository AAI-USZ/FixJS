function(user){
          var team = room.getTeams()[room.getUserToTeam()[user]];
          if (team && !team.buzzed) {
            clearTimeout(questionTimeout);
            answering = true;
            currentUser = user;
            room.getChannel().onBuzz(app.getUsers()[user]);
            team.buzzed = true;
            pauseReading();
            console.log(answerTimeout);
            answerTimeout = setTimeout(answerTimer, app.Constants.Multiplayer.Game.ANSWER_TIMEOUT);
            buzzed = true;
            numBuzzes++;
          }
        }