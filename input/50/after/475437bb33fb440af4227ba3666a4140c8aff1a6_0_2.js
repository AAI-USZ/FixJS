function() {
          if (current !== undef) {
            removeItem(current);
            --itemIndex;
            findNext();
          }
          else {
            return null;
          } 
        }