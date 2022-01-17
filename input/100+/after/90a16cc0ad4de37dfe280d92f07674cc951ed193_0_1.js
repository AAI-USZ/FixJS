function(_, _super) {
  _.cmd = '\\vector';
  _.html_template = ['<span class="array"></span>', '<span></span>'];
  _.latex = function() {
    return '\\begin{matrix}' + this.foldChildren([], function(latex, child) {
      latex.push(child.latex());
      return latex;
    }).join('\\\\') + '\\end{matrix}';
  };
  _.text = function() {
    return '[' + this.foldChildren([], function(text, child) {
      text.push(child.text());
      return text;
    }).join() + ']';
  }
  _.createBefore = function(cursor) {
    _super.createBefore.call(this, this.cursor = cursor);
  };
  _.keydown = function(e) {
    var currentBlock = this.cursor.parent;

    if (currentBlock.parent === this) {
      if (e.which === 13) { //enter
        var newBlock = MathBlock();
        newBlock.parent = this;
        newBlock.jQ = $('<span></span>')
          .data(jQueryDataKey, {block: newBlock})
          .insertAfter(currentBlock.jQ);
        if (currentBlock.next)
          currentBlock.next.prev = newBlock;
        else
          this.lastChild = newBlock;

        newBlock.next = currentBlock.next;
        currentBlock.next = newBlock;
        newBlock.prev = currentBlock;
        this.bubble('redraw').cursor.appendTo(newBlock);

        e.preventDefault();
        return false;
      }
      else if (e.which === 9 && !e.shiftKey && !currentBlock.next) { //tab
        if (currentBlock.isEmpty()) {
          if (currentBlock.prev) {
            this.cursor.insertAfter(this);
            delete currentBlock.prev.next;
            this.lastChild = currentBlock.prev;
            currentBlock.jQ.remove();
            this.bubble('redraw');

            e.preventDefault();
            return false;
          }
          else
            return;
        }

        var newBlock = MathBlock();
        newBlock.parent = this;
        newBlock.jQ = $('<span></span>').data(jQueryDataKey, {block: newBlock}).appendTo(this.jQ);
        this.lastChild = newBlock;
        currentBlock.next = newBlock;
        newBlock.prev = currentBlock;
        this.bubble('redraw').cursor.appendTo(newBlock);

        e.preventDefault();
        return false;
      }
      else if (e.which === 8) { //backspace
        if (currentBlock.isEmpty()) {
          if (currentBlock.prev) {
            this.cursor.appendTo(currentBlock.prev)
            currentBlock.prev.next = currentBlock.next;
          }
          else {
            this.cursor.insertBefore(this);
            this.firstChild = currentBlock.next;
          }

          if (currentBlock.next)
            currentBlock.next.prev = currentBlock.prev;
          else
            this.lastChild = currentBlock.prev;

          currentBlock.jQ.remove();
          if (this.isEmpty())
            this.cursor.deleteForward();
          else
            this.bubble('redraw');

          e.preventDefault();
          return false;
        }
        else if (!this.cursor.prev) {
          e.preventDefault();
          return false;
        }
      }
    }
  };
}