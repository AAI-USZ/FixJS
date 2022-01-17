function(_) {
  _.renderLatex = function(latex) {
    var self = this, cursor = self.cursor;
    self.jQ.children().slice(1).remove();
    self.firstChild = self.lastChild = 0;
    cursor.show().appendTo(self);

    latex = latex.match(/(?:\\\$|[^$])+|\$(?:\\\$|[^$])*\$|\$(?:\\\$|[^$])*$/g) || '';
    for (var i = 0; i < latex.length; i += 1) {
      var chunk = latex[i];
      if (chunk[0] === '$') {
        if (chunk[-1+chunk.length] === '$' && chunk[-2+chunk.length] !== '\\')
          chunk = chunk.slice(1, -1);
        else
          chunk = chunk.slice(1);

        var root = RootMathCommand(cursor);
        cursor.insertNew(root);
        root.firstChild.renderLatex(chunk);
        cursor.show().insertAfter(root);
      }
      else {
        for (var j = 0; j < chunk.length; j += 1)
          this.cursor.insertNew(VanillaSymbol(chunk[j]));
      }
    }
  };
  _.onKey = RootMathBlock.prototype.onKey;
  _.onText = function(ch) {
    this.cursor.deleteSelection();
    if (ch === '$')
      this.cursor.insertNew(RootMathCommand(this.cursor));
    else
      this.cursor.insertNew(VanillaSymbol(ch));

    return false;
  };
}