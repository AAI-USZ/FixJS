function cleanupMacro(list) {
    if (typeof list === 'string') {
      return primToken(function() {
        return list;
      })(function() {
        return 0;
      });
    } else if (!(list instanceof Cons) || list === Nil) {
      return list;
    } else if (list instanceof LexCons) {
      return list.map(cleanupMacro);
    } else {
      return lexCons(cleanupMacro(list.head()), 0, cleanupMacro(list.tail()), 0);
    }
  }