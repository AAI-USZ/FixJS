function analyzeControlFlow() {
      /* TODO: Exceptions aren't supported. */
      if (this.method.exceptions.length > 0) {
        return false;
      }

      assert(this.bytecodes);
      this.detectBasicBlocks();
      this.normalizeReachableBlocks();
      this.computeDominance();
      //this.computeFrontiers();

      this.analyzedControlFlow = true;
      return true;
    }