function(_, _super) {
  _.htmlTemplate =
      '<sup class="nthroot non-leaf" #mqCmdId #mqBlockId:0>#mqBlock:0</sup>'
    + '<span class="non-leaf" #mqCmdId>'
    +   '<span class="sqrt-prefix non-leaf">&radic;</span>'
    +   '<span class="sqrt-stem non-leaf" #mqBlockId:1>#mqBlock:1</span>'
    + '</span>'
  ;
  _.textTemplate = ['sqrt[', '](', ')'];
  _.latex = function() {
    return '\\sqrt['+this.firstChild.latex()+']{'+this.lastChild.latex()+'}';
  };
}