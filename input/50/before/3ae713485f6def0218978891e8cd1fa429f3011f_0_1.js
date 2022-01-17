function state() {
      this.id = id++;

      if (id > 100) {
        throw VerifierError("Probably in an infinite loop.");
      }

      this.stack = [];
      this.scope = [];
      this.local = [];
    }