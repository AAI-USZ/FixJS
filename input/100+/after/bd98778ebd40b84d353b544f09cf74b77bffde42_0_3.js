function(first) {
  if (!this.setSize) {
    var column = first instanceof Bento.Column ? first : new Bento.Column;
    Bento.Column.apply(column, arguments);
    return column;
  }
  for (var i = 0, j = arguments.length, arg; i < j; i++) {
    switch (typeof (arg = arguments[i])) {
      case 'object':
        if (arg != null)
        if (arg instanceof Bento)
          this.setBento(arg);
        else if (arg.nodeType)
          this.setElement(arg);
        else if (arg.push)
          if (arg[0]) var width = this.setWidth(arg[0]);
          if (arg[1]) {
            this.maxHeight = arg[1];
            this.holes = [[0, arg[1], this]]
          }
          if (arg[2]) this.whitespace = arg[2];
        break;
      case 'number':
        if (width == null) var width = this.setWidth(arg);
    }
  }
  this.items = [];
}