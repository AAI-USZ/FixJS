function(_) {
  _.ctrlSeq = '\\sqrt';
  _.htmlTemplate =
      '<span class="sqrt">'
    +   '<span class="non-leaf sqrt-prefix">&radic;</span>'
    +   '<span class="sqrt-stem">#0</span>'
    + '</span>'
  ;
  _.textTemplate = ['sqrt(', ')'];
  _.redraw = function() {
    var block = this.lastChild.jQ;
    scale(block.prev(), 1, block.innerHeight()/+block.css('fontSize').slice(0,-2) - .1);
  };
}