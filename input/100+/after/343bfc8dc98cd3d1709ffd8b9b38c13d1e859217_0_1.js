function byPriority(a, b) {
//      if (!a.fixable || !b.fixable) {
//        return a;
//      }
      var p1 = errors[a.raw] ? errors[a.raw].priority : -1;
      var p2 = errors[b.raw] ? errors[b.raw].priority : -1;

//      var p1 = errors[a.raw].priority;
//      var p2 = errors[b.raw].priority;

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