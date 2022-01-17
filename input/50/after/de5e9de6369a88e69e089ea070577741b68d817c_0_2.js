function (stem) {
        if (stem) {
          if (upper)
            newKeywords.addToSet(stem);
          else
            newKeywords.addToSet(stem.toLowerCase());
        }
      }