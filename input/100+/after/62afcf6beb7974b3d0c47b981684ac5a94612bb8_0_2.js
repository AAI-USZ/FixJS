function() {
    var normal_compile;
    C.Construct.prototype._compile = function() {
      var compile_fn;
      compile_fn = this.quasiquoted ? this.compile_quasiquoted : this.unquoted ? this.compile_unquoted : this.unquote_spliced ? this.compile_unquote_spliced : this.quoted ? this.compile_quoted : this.compile;
      return compile_fn.apply(this, arguments);
    };
    C.Construct.prototype.compile_quoted = function() {
      return "new lemur.Compiler." + this.constructor.name + "('" + this.value + "')";
    };
    normal_compile = function() {
      return this.compile.apply(this, arguments);
    };
    C.Construct.prototype.compile_quasiquoted = normal_compile;
    C.Construct.prototype.compile_unquoted = normal_compile;
    C.Construct.prototype.compile_unquote_spliced = normal_compile;
    C.Number.prototype.valueOf = function() {
      return +this.compile();
    };
    C.Number.prototype.toString = C.Number.prototype.compile;
    C.String.prototype.toString = function() {
      return eval(this.compile());
    };
    C.String.prototype.valueOf = C.String.prototype.toString;
    return C.If.prototype.transform = function() {
      this.then = C.Macro.transform(this.then);
      if (this._else != null) {
        this._else = C.Macro.transform(this._else);
      }
      return this;
    };
  }