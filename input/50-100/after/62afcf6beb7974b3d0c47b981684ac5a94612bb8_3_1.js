function() {
      var c_sym_prog, prog, r, sym_prog;
      setup_built_in_macros();
      r = compile_runtime();
      sym_prog = C.Var.gensym("program");
      c_sym_prog = sym_prog.compile();
      prog = sexp._compile();
      return "// Your program\nvar " + c_sym_prog + " = " + prog + ";\n\n// Oppo runtime\n" + r + "\n\n// Run the oppo program\nif (" + c_sym_prog + ")\n  " + c_sym_prog + "();\nelse\n  " + c_sym_prog + ";";
    }