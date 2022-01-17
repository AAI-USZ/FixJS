function() {
      var compile_fn;
      compile_fn = this.quoted ? this.compile_quoted : this.quasiquoted ? this.compile_quasiquoted : this.unquoted ? this.compile_unquoted : this.unquote_spliced ? this.compile_unquote_spliced : this.compile;
      return compile_fn.apply(this, arguments);
    }