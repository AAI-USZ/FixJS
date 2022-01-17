function(_, _super) {
  _.ctrlSeq = '\\binom';
  _.htmlTemplate =
      '<span class="paren non-leaf" #mqCmdId>(</span>'
    + '<span class="non-leaf" #mqCmdId>'
    +   '<span class="array non-leaf">'
    +     '<span #mqBlockId:0>#mqBlock:0</span>'
    +     '<span #mqBlockId:1>#mqBlock:1</span>'
    +   '</span>'
    + '</span>'
    + '<span class="paren non-leaf" #mqCmdId>)</span>'
  ;
  _.jQize = function() {
    _super.jQize.call(this);
    this.blockjQ = this.jQ.children();
    this.bracketjQs = this.blockjQ.parent().siblings();
  };
  _.textTemplate = ['choose(',',',')'];
  _.redraw = Bracket.prototype.redraw;
}