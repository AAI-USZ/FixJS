function f1(arg1, arg2) {
      try {
        this.undef();
      } catch (exception) {
        ex = exception;
      }
    }