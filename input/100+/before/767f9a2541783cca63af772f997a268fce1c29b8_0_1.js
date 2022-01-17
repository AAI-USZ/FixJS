function(latex) {
    var jQ = this.jQ;

    jQ.children().slice(1).remove();
    this.firstChild = this.lastChild = 0;

    var mathTree = latexMathParser.parse(latex);
    mathTree.children().adopt(this, 0, 0);

    var html = this.join('html');
    MathElement.jQize(html).appendTo(jQ);

    this.cursor.appendTo(this);

    // XXX HACK ALERT
    this.jQ.mathquill('redraw');
    this.blur();
  }