function concatList(l) {
    if (l === _nil()) {
      return "";
    } else if (typeof (head(l)) === 'string') {
      return (head(l)) + concatList(tail(l));
    } else {
      return Parse.print(head(l)) + concatList(tail(l));
    }
  }