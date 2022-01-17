function elements(l, first, nosubs) {
    if (getType(l) === 'nil') {
      return '';
    } else if (getType(l) !== 'lexCons') {
      return " | " + (print(l));
    } else {
      return "" + (first ? '' : ' ') + (print(l.head()) + elements(l.tail(), false));
    }
  }