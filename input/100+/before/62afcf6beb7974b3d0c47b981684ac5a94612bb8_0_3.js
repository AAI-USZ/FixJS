function() {
    C.Construct.prototype._compile = function() {
      var compile_fn;
      compile_fn = this.quoted ? this.compile_quoted : this.quasiquoted ? this.compile_quasiquoted : this.unquoted ? this.compile_unquoted : this.unquote_spliced ? this.compile_unquote_spliced : this.compile;
      return compile_fn.apply(this, arguments);
    };
    C.Construct.prototype.compile_quoted = function() {
      return "new lemur.Compiler." + this.constructor.name + "('" + this.value + "')";
    };
    C.Construct.prototype.compile_quasiquoted = C.Construct.prototype.compile;
    C.Construct.prototype.compile_unquoted = C.Construct.prototype.compile;
    C.Construct.prototype.compile_unquote_spliced = C.Construct.prototype.compile;
    C.Number.prototype.compile_quoted = C.Number.prototype.compile;
    C.String.prototype.compile_quoted = C.String.prototype.compile;
    C.Array.prototype.compile_quoted = C.Array.prototype.compile;
    return C.If.prototype.transform = function() {
      this.then = C.Macro.transform(this.then);
      if (this._else != null) {
        this._else = C.Macro.transform(this._else);
      }
      return this;
    };
  }