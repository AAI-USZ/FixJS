function (stem) {
        if (stem) {
          if (upper)
            keywords.addToSet(stem);
          else
            keywords.addToSet(stem.toLowerCase());
        }
      }