function analyzeControlFlow() {
      assert(this.bytecodes);
      this.detectBasicBlocks();
      this.normalizeReachableBlocks();
      this.computeDominance();
      //this.computeFrontiers();

      this.analyzedControlFlow = true;
      return true;
    }