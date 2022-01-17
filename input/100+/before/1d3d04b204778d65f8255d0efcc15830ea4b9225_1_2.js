function(latex) {
    var jQ = this.jQ;

    jQ.children().slice(1).remove();
    this.firstChild = this.lastChild = 0;

    // temporarily take the element out of the displayed DOM
    // while we add stuff to it.  Grab the next or parent node
    // so we know where to put it back.
    // NOTE: careful that it be the next or parent DOM **node** and not
    // HTML element, lest we skip a text node.
    var next = jQ[0].nextSibling,
      parent = jQ[0].parentNode;

    jQ.detach();
    this.cursor.appendTo(this).writeLatex(latex);

    // Put. the element. back.
    // if there's no next element, it's at the end of its parent
    next ? jQ.insertBefore(next) : jQ.appendTo(parent);

    // XXX HACK ALERT
    this.jQ.mathquill('redraw');
    this.blur();
  }