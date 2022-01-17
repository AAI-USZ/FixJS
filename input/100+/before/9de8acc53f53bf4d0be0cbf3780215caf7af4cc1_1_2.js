function copyWith(main, vars, err, global, debug, method) {
      return new Code(main != null ? main : this.main, vars != null ? vars : this.vars, err != null ? err : this.err, global != null ? global : this.global, debug != null ? debug : this.debug, method != null ? method : this.method);
    }