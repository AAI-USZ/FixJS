function(){
          game.started = true;
          started = true;
          app.dao.tossup.search(
            {
              random:'true',
              limit:room.getProperties().numQuestions,
              value:'',
              params:{
                difficulty:room.getProperties().difficulty,
                category:room.getProperties().category
              }
            },
            function(tossups) {
              if (tossups.length > 0) {
                curTossups = tossups;
                tossupLength = tossups.length;
                currentTossup = tossups[0];
                game.currentTossup = currentTossup.id;
                curWords = currentTossup.question.split(" ");
                count = curWords.length;
                game.wordNumber = curWords.length - count + 1;
                room.getChannel().onStartQuestion();
                resumeReading();
              }
            }
          );
        }