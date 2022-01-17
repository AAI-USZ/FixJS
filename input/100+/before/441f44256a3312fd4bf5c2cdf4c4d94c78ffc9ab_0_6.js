function(){
            room.getChannel().onStartQuestion();
            if (!(tossupLength == index+1)) {
              game.questionNumber = ++index+1;
              numBuzzes = 0;
              curPartial = [];
              currentTossup = curTossups[index];
              game.currentTossup = currentTossup.id;
              curWords = curTossups[index].question.split(" ");
              count = curWords.length;
              game.wordNumber = curWords.length - count + 1;
              resumeReading();
              for (var i in room.getTeams()) {
                room.getTeams()[i].setBuzzed(false);
              }
            } else {
              app.deleteRoom(room.getName());
            }
          }