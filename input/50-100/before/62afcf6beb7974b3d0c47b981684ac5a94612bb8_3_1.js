function(sexp) {
    return new lemur.Compiler().compile(function() {
      var prog, r;
      setup_built_in_macros();
      r = compile_runtime();
      prog = sexp._compile();
      return "" + r + "\n" + prog;
    });
  }