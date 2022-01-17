function() {
          var score = {};
          for (var i in room.teams) {
            score[i] = room.teams[i].getScore();
          }
          return score;
        }