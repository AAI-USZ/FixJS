function(_, _super) {
  _.ctrlSeq = '\\text';
  _.htmlTemplate = '<span class="text">#0</span>';
  _.replaces = function(replacedText) {
    if (replacedText instanceof MathFragment)
      this.replacedText = replacedText.remove().jQ.text();
    else if (typeof replacedText === 'string')
      this.replacedText = replacedText;
  };
  _.textTemplate = ['"', '"'];
  _.createBlocks = function() {
    //FIXME: another possible Law of Demeter violation, but this seems much cleaner, like it was supposed to be done this way
    this.firstChild =
    this.lastChild =
      InnerTextBlock();

    this.blocks = [ this.firstChild ];

    this.firstChild.parent = this;
    this.firstChild.jQ = this.jQ.append(this.firstChild.jQ);
  };
  _.createBefore = function(cursor) {
    _super.createBefore.call(this, this.cursor = cursor);

    if (this.replacedText)
      for (var i = 0; i < this.replacedText.length; i += 1)
        this.write(this.replacedText.charAt(i));
  };
  _.write = function(ch) {
    this.cursor.insertNew(VanillaSymbol(ch));
  };
  _.onKey = function(key, e) {
    //backspace and delete and ends of block don't unwrap
    if (!this.cursor.selection &&
      (
        (key === 'Backspace' && !this.cursor.prev) ||
        (key === 'Del' && !this.cursor.next)
      )
    ) {
      if (this.isEmpty())
        this.cursor.insertAfter(this);

      return false;
    }
  };
  _.onText = function(ch) {
    this.cursor.deleteSelection();
    if (ch !== '$')
      this.write(ch);
    else if (this.isEmpty())
      this.cursor.insertAfter(this).backspace().insertNew(VanillaSymbol('\\$','$'));
    else if (!this.cursor.next)
      this.cursor.insertAfter(this);
    else if (!this.cursor.prev)
      this.cursor.insertBefore(this);
    else { //split apart
      var next = TextBlock(MathFragment(this.cursor.next, this.firstChild.lastChild));
      next.placeCursor = function(cursor) { //FIXME HACK: pretend no prev so they don't get merged
        this.prev = 0;
        delete this.placeCursor;
        this.placeCursor(cursor);
      };
      next.firstChild.focus = function(){ return this; };
      this.cursor.insertAfter(this).insertNew(next);
      next.prev = this;
      this.cursor.insertBefore(next);
      delete next.firstChild.focus;
    }
    return false;
  };
}