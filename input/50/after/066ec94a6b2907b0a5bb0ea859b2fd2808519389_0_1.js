function (word) {
        if (word) {
          if (upper)
            newKeywords.addToSet(word);
          else
            newKeywords.addToSet(word.toLowerCase());
        }
      }