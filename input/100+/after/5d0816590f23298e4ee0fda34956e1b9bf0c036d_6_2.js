function constraintHierarchyPlanner(ceilingStrength)
  {
    LOG("  CHP: constraint to enforce = " + this.cccToEnforce);
    LOG("  CHP: retractable constraints = " + this.retractableCnsQueue);

    this.multiOutputPlanner();

    while (!this.cccToEnforce.isSatisfied()
           && this.retractableCnsQueue.length > 0)
    {
      var ccc = Strength.popWeakest(this.retractableCnsQueue);
      /* TODO: Unnecessary? */
      if (!Strength.isWeaker(ccc.strength, ceilingStrength)) { continue; }
      this.strongestRetractedStrength = Strength.pickStronger(
          this.strongestRetractedStrength, ccc.strength);
      this.eliminateConstraint(ccc, null);
      this.multiOutputPlanner();
    }
  }