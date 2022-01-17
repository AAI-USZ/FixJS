function(_, _super) {
  _.init = function() {
    MathCommand.prototype.init.call(this, '\\editable');
  };

  _.jQadd = function() {
    var self = this;
    // FIXME: this entire method is a giant hack to get around
    // having to call createBlocks, and createRoot expecting to
    // render the contents' LaTeX. Both need to be refactored.
    _super.jQadd.apply(self, arguments);
    var block = self.firstChild.disown();
    var blockjQ = self.jQ.children().detach();

    self.firstChild =
    self.lastChild =
      RootMathBlock();

    self.blocks = [ self.firstChild ];

    self.firstChild.parent = self;

    createRoot(self.jQ, self.firstChild, false, true);
    self.cursor = self.firstChild.cursor;

    block.children().adopt(self.firstChild, 0, 0);
    blockjQ.appendTo(self.firstChild.jQ);

    self.firstChild.cursor.appendTo(self.firstChild);
  };

  _.latex = function(){ return this.firstChild.latex(); };
  _.text = function(){ return this.firstChild.text(); };
}