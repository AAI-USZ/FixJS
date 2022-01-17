function(_, _super) {
  _.htmlTemplate =
      '<sup class="nthroot non-leaf">#0</sup>'
    + '<span class="non-leaf">'
    +   '<span class="sqrt-prefix non-leaf">&radic;</span>'
    +   '<span class="sqrt-stem non-leaf">#1</span>'
    + '</span>'
  ;
  _.textTemplate = ['sqrt[', '](', ')'];
  _.latex = function() {
    return '\\sqrt['+this.firstChild.latex()+']{'+this.lastChild.latex()+'}';
  };
}