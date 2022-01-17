function copyWith(main, vars, err, global, debug, method, unmemoized) {
      if (!main && !unmemoized && this.unmemoized) {
        console.log("PRESERVING UNMEMOIZED: @unmemoized");
      }
      return new Code(main != null ? main : this.main, vars != null ? vars : this.vars, err != null ? err : this.err, global != null ? global : this.global, debug != null ? debug : this.debug, method != null ? method : this.method, unmemoized != null ? unmemoized : (!main ? this.unmemoized : null));
    }