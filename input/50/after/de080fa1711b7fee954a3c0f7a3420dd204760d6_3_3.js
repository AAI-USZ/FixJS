function(){
            room.getChannel().onQuestionTimeout();
            room.getChannel().onCompleteQuestion(currentTossup);
            nextQuestion();
          }