function concatList(l) {
    if (l === _nil()) {
      return "";
    } else {
      return (head(l)) + concatList(tail(l));
    }
  }