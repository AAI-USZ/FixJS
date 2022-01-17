function() {
          counter -= 1;
          if (counter <= 0 && done && !fired) {
            fired = true;
            callback();
          }
          return counter;
        }