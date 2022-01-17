function execute(mm) {
    LOG("execute: " + mm);

    var callerSaved = caller;
    caller = mm;

    mm.inputsUsedPrev = mm.inputsUsed;
    mm.inputsUsed = [];
    /* Must remove myself from the usedBy of my former inputs. If they are not
     * changed during this evaluation, then they would be left with a false
     * positive if I failed to use them again. */
    mm.inputsUsedPrev.forEach(function (uu) {
      uu.usedBy.remove(mm);
    });

    var outputs = mm.outputs;
    outputs.forEach(function (ww) {
      ww.dependsOnSelf = false;
    });

    /* Methods in Models can use 'this' to get variables in the model. Methods
     * outside of models cannot use 'this', so it does not matter if mm.context
     * is undefined for them. */
    var results = mm.fn.call(mm.context);
    executedSet.push(mm);

    caller = callerSaved;
    mm.needsExecution = false;

    /* Write new values to outputs. Must do this before calling set() in case
     * of diamond dependencies. A diamond dependency occurs when a method has
     * multiple outputs that are used by another method. If we set one of the
     * outputs, the using method will be executed, which will get the other
     * outputs, so they need to already have their new values assigned. */
    if (outputs.length === 1) {
      LOG("single output from " + mm + ":");
      outputs[0].set(results);
    } else {
      ASSERT(Array.isArray(results),
        "expected multi-output method, " + mm + ", to return array");
      ASSERT(results.length === outputs.length,
        "expected " + mm + " to return array of size " + outputs.length +
        ", not " + results.length);
      LOG("multiple outputs from " + mm + ":");
      outputs.forEach(function (vv, i) {
        vv.set(results[i]);
      });
    }

    /* Notify their subscribers. */
    outputs.forEach(function (vv) { set(vv); });
  }