function solve() {
    /* Skip if we can. */
    if (!this.needsSolution) {
      LOG("Reusing last solution.");
      return [];
    }

    LOG("Solving...");

    /* After this loop, every variable in priority after index j will have the
     * same relative priority as in this.priorityPrev. The array slice of
     * priority up to index j should hold the promoted variables.
     *
     * Note: The promotedSet may differ from the touchedSet. The user may have
     * touched some variables without affecting their priority. */
    var j = this.priority.length - 1;
    var i;
    for (i = this.priorityPrev.length - 1; i >= 0; --i) {
      if (this.priorityPrev[i] === this.priority[j]) {
        --j;
      }
    }
    var promotedSet = this.priority.slice(0, j + 1);

    LOG("solve: priorityPrev = " + this.priorityPrev);
    LOG("solve: priority = " + this.priority);
    LOG("solve: promotedSet = " + promotedSet);

    /* TODO: This should be done outside the Solver so that clients can
     * control the solution. */
    this.priority.forEach(function (vvv, i) {
      vvv.stayConstraint.strength = i + 1;
    }, this);

    if (this.unenforcedCnsQueue.length > 0) {
      ASSERT(this.planPrev.length === 0,
        "unenforcedCnsQueue should be non-empty only on the first solve");
    }

    /* Try to change the solution so that we can enforce the stay constraints
     * of promoted variables. */
    promotedSet.forEach(function (vvv) {
      this.unenforcedCnsQueue.push(vvv.stayConstraint);
    }, this);

    this.constraintHierarchySolver();

    var plan = this.getPlan();
    ASSERT(plan.length > 0, "no solution found");
    LOG("solve: plan = " + plan);

    var planDiff = plan.setSubtract(this.planPrev);
    LOG("solve: planDiff = " + planDiff);

    /* Prepare for the next solve. */
    this.needsSolution = false;
    this.priorityPrev = this.priority.slice();
    this.planPrev = plan;
    LOG("Finished solution.");

    return planDiff;
  }