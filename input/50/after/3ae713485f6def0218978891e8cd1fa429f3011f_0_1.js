function state() {
      this.id = id++;

      // TODO this should be removed or at least the limit should be
      // increased to a bigger number
      if (id > 1000) {
        throw new VerifierError("Probably in an infinite loop.");
      }

      this.stack = [];
      this.scope = [];
      this.local = [];
    }