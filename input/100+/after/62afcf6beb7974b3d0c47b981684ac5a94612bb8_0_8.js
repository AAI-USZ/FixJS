function() {
      var grp, ls, sym_ls, value;
      value = this.compile_quoted.apply(this, arguments);
      ls = "new lemur.Compiler.List(" + value + ", " + this.line_number + ")";
      ls = new C.Raw(ls, this.yy);
      sym_ls = C.Var.gensym("ls");
      grp = new C.CommaGroup([
        new C.Var.Set({
          _var: sym_ls,
          value: ls
        }), new C.Raw("" + (sym_ls.compile()) + ".quoted = true"), sym_ls
      ]);
      return grp.compile();
    }