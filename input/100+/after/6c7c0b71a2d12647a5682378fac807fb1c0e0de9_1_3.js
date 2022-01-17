function(){
          started = true;
          app.dao.tossup.search(
            {
              random:true,
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
                curWords = currentTossup.question.split(" ");
                count = curWords.length;
                room.getChannel().onStartQuestion();
                resumeReading();
              }
            }
          );
        }