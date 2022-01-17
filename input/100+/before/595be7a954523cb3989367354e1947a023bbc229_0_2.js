function() {
    MathCommand.prototype.init.call(this, '\\editable');
    var cursor;
    this.createBefore = function(c){ _super.createBefore.call(this, cursor = c); };
    this.jQize = function() {
      _super.jQize.call(this);
      createRoot(this.jQ, this.firstChild, false, true);

      this.firstChild.blur = function() {
        // when cursor is inserted after editable, append own
        // cursor FIXME HACK
        if (cursor.prev !== this.parent) return;
        delete this.blur;
        this.cursor.appendTo(this);
        MathBlock.prototype.blur.call(this);
      };
      this.latex = function(){ return this.firstChild.latex(); };
      this.text = function(){ return this.firstChild.text(); };
    };
  }