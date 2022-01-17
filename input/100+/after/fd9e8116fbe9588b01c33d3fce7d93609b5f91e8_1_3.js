function(letter) {
        var value = KanjiDigitMap[letter], holder = value > 9;
        if(holder) {
          place *= value / (lastHolder || 1);
          lastHolder = value;
        } else {
          if(lastWasHolder === false) {
            place *= 10;
          }
          sum += place * value;
        }
        lastWasHolder = holder;
      }