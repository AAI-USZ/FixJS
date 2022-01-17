function elements(l, first, nosubs) {
    if (l === Nil) {
      return '';
    } else if (!(l instanceof Cons)) {
      return " | " + (print(l));
    } else {
      return "" + (first ? '' : ' ') + (print(l.head()) + elements(l.tail(), false));
    }
  }