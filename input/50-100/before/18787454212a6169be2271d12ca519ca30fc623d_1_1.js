function(_) {
  _.ctrlSeq = '\\sqrt';
  _.htmlTemplate =
      '<span class="sqrt" #mqCmdId>'
    +   '<span class="non-leaf sqrt-prefix">&radic;</span>'
    +   '<span class="sqrt-stem" #mqBlockId:0>#mqBlock:0</span>'
    + '</span>'
  ;
  _.textTemplate = ['sqrt(', ')'];
  _.redraw = function() {
    var block = this.lastChild.jQ;
    scale(block.prev(), 1, block.innerHeight()/+block.css('fontSize').slice(0,-2) - .1);
  };
}