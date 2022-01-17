function byPriority(a, b) {
      var p1 = errors[a.raw].priority;
      var p2 = errors[b.raw].priority;

      if (p1 === p2) {
        if (a.line === b.line) {
          return b.character - a.character;
        } else {
          return b.line - a.line;
        }
      } else {
        return p1 - p2;
      }
    }