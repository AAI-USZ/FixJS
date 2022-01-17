function() {
          if (currentItem !== undef) {
            removeItem(currentItem);
            --itemIndex;
            findNext();
          }
        }