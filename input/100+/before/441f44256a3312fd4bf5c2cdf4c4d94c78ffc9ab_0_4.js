function(obj) {
              if (callback) {
                callback(obj); 
              }
              if (obj) {
                room.getChannel().onAnswer(app.getUsers()[user],"answered correctly with "+answer);
                room.getChannel().onCompleteQuestion(currentTossup);
                nextQuestion();
              } else {
                room.getChannel().onAnswer(app.getUsers()[user],"answered incorrectly with "+answer);
                if (numBuzzes == getNumTeams()) {
                  nextQuestion();
                } else {
                  resumeReading()
                }
              }
            }