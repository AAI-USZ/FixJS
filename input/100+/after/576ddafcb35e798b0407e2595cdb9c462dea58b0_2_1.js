function() {
      var c_sym_prog, prog, r, sym_prog;
      setup_built_in_macros();
      if (comp_runtime) {
        r = compile_runtime();
      }
      if (r != null) {
        r = "\n// Oppo runtime\n" + r;
      } else {
        r = "";
      }
      sym_prog = C.Var.gensym("program");
      c_sym_prog = sym_prog.compile();
      prog = sexp._compile();
      return "// Your program\nvar " + c_sym_prog + " = " + prog + ";\n\n" + r + "\n\n// Run the oppo program\nif (lemur.core.to_type(" + c_sym_prog + ") === 'function')\n  " + c_sym_prog + "();\nelse\n  " + c_sym_prog + ";";
    }