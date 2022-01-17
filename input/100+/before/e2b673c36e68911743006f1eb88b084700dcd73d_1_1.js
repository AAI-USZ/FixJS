function update() {
    /* Flush the update. */
    ASSERT(updateTask,
      "expected an update to be scheduled after touching");
    clearTimeout(updateTask);
    updateTask = null;

    /* Skip if we can. */
    if (!touchedSet.length) return;

    LOG("Updating...");

    /* TODO: Figure out what to do with self-loop variables. For now, the
     * self-loop flag should be considered broken. */

    touchedSet.forEach(function (vv) {
      LOG(vv + " is " + ((vv.solver) ? ("") : ("not ")) +
          "attached to multi-way constraints");
      if (vv.solver) Array.prototype.push.apply(newMethods, vv.solver.solve());
      var mm = vv.writtenBy;
      if (mm && vv.dependsOnSelf) {
        newMethods.setInsert(mm);
      }
    });

    var executedSet = [];
    var changedSet = [];
    evaluator.update(touchedSet, newMethods, executedSet, changedSet);

    LOG("touchedSet = " + touchedSet);
    LOG("newMethods = " + newMethods);
    LOG("executedSet = " + executedSet);
    LOG("changedSet = " + changedSet);

    hd.behaviors.forEach(function (behavior) {
      if (behavior.update) {
        behavior.update(
          touchedSet, executedSet, changedSet, evaluator.getTimestamp());
      }
    });

    touchedSet = [];
    newMethods = [];
    LOG("Finished update.");
  }