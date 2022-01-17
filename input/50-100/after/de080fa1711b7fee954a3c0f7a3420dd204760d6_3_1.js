function(user){
          room.getChannel().onAnswerTimeout(app.getUsers()[user]);
          if (numBuzzes == getNumTeams()) {
            nextQuestion();
            room.getChannel().onCompleteQuestion(currentTossup);
          } else {
            resumeReading()
          }
        }