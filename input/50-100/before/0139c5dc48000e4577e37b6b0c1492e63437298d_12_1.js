function addConstraint(cc, strength) {
    var ccc = cc.inner;

    if (!ccc) {
      /* Default for user-defined constraints. */
      if (strength === undefined) strength = Strength.REQUIRED;

      ccc = new Solver.Constraint(cc, strength);
      this.constraints.push(ccc);

      if (strength === Strength.REQUIRED) {
        /* Need to enqueue our required constraints for the first solution.
         * The incremental solver will react to variable changes by directly
         * adding only stay constraints. */
        this.unenforcedCnsQueue.push(ccc);
      }

      LOG(cc + " added to constraint graph.");
    }

    return ccc;
  }