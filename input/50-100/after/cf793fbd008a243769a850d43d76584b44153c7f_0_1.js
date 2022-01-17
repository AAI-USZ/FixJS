function(idt){
    var tree, that;
    idt || (idt = '');
    tree = '\n' + idt + this.constructor.displayName;
    if (that = this.show()) {
      tree += ' ' + that;
    }
    this.eachChild(function(it){
      tree += it.toString(idt + TAB);
    });
    return tree;
  }