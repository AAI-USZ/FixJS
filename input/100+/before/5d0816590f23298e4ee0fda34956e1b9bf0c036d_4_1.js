function update() {
    /* Flush the update. */
    ASSERT(updateTask,
      "expected an update to be scheduled after touching");
    clearTimeout(updateTask);
    updateTask = null;

    /* Skip if we can. */
    if (!touchedSet.length) return;

    LOG("Updating...");

    var newMethods = [];
    touchedSet.forEach(function (vv) {
      LOG(vv + " is " + ((vv.solver) ? ("") : ("not ")) +
          "attached to multi-way constraints");
      if (vv.solver) Array.prototype.push.apply(newMethods, vv.solver.solve());
    });

    /* TODO: is there a better name? */
    //var droppedInputs = [];
    //newMethods.forEach(function (mm) {
      /* Newly unselected methods are no longer using ANY of their inputs. We
       * will find during evaluation which selected methods are no longer using
       * at least one of their inputs. */
      //var cc = mm.constraint;
      //assert(mm.isSelected && (mm === cc.selectedMethod)
             //&& (mm !== cc.selectedMethodPrev),
        //"expected method to be new in the solution");
      //var mmUnselected = mm.constraint.selectedMethodPrev;
      //if (mmUnselected) {
        //mmUnselected.inputsUsedPrev = mmUnselected.inputsUsed;
        //mmUnselected.inputsUsed = [];
        //droppedInputs.push(mmUnselected);
      //}
    //});

    touchedSet.forEach(function (vv) {
      /* We do not want to call a self-dependent variable's writer by setting
       * the variable - it will lead to a second call to set(). Instead,
       * pretend its writer is a new method (if it is still in the solution). */
      /* A computed variable needs its writer executed at least once during an
       * evaluation phase to establish a usedBy connection with its inputs. We
       * lie when we create it, saying that it dependsOnSelf, just so that it
       * gets computed here. */
      if (vv.dependsOnSelf && vv.writtenBy) {
        newMethods.push(vv.writtenBy);
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
    LOG("Finished update.");
  }