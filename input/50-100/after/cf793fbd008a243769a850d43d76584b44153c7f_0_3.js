function(o, cons){
    var firstPart;
    cons == null && (cons = false);
    firstPart = "(" + this.first.compile(o) + ")";
    if (cons) {
      firstPart = "[" + firstPart + "]";
    }
    return firstPart + ".concat(" + this.second.compile(o) + ")";
  }