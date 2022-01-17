function(obj) {
              if (callback) {
                callback(obj); 
              }
              var team = room.getTeams()[room.getUserToTeam()[user]];
              if (obj) {
                team.addScore(user, 10);
                room.getChannel().onAnswer(app.getUsers()[user],"answered correctly with "+answer+" for 10 points");
                room.getChannel().onUpdateScore(game.getScore());
                room.getChannel().onCompleteQuestion(currentTossup);
                nextQuestion();
              } else {
                if (numBuzzes == getNumTeams()) {
                  room.getChannel().onAnswer(app.getUsers()[user],"answered incorrectly with "+answer+" for no penalty");
                  nextQuestion();
                } else {
                  team.addScore(user, -5);
                  room.getChannel().onAnswer(app.getUsers()[user],"negged with "+answer);
                  room.getChannel().onUpdateScore(game.getScore());
                  resumeReading()
                }
              }
            }