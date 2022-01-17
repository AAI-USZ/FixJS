function(_, _super) {
  _.ctrlSeq = '\\binom';
  _.htmlTemplate =
      '<span class="paren non-leaf">(</span>'
    + '<span class="non-leaf">'
    +   '<span class="array non-leaf">'
    +     '<span>#0</span>'
    +     '<span>#1</span>'
    +   '</span>'
    + '</span>'
    + '<span class="paren non-leaf">)</span>'
  ;
  _.jQize = function() {
    _super.jQize.call(this);
    this.blockjQ = this.jQ.children();
    this.bracketjQs = this.blockjQ.parent().siblings();
  };
  _.textTemplate = ['choose(',',',')'];
  _.redraw = Bracket.prototype.redraw;
}