function (word) {
        if (word) {
          if (upper)
            keywords.addToSet(word);
          else
            keywords.addToSet(word.toLowerCase());
        }
      }