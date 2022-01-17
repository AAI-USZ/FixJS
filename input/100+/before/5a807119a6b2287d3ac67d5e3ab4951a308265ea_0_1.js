function maybeExecute(mm) {
    LOG("maybeExecute: " + mm);

    /* Mark methods as visited to prevent double execution. */
    if (mm.lastMaybeExecuted === timestamp) {
      LOG(mm + ((mm.needsExecution)
                ? (" is executing") : (" already maybeExecuted")));
      return;
    }
    mm.lastMaybeExecuted = timestamp;

    if (!mm.needsExecution) {
      ASSERT(mm.isSelected,
        "do not call maybeExecute() with an unselected method, " + mm);
      /* We know here that this method is not new in the solution, so it has
       * valid inputsUsed. */
      mm.needsExecution = mm.inputsUsed.some(isChanged);
      LOG(mm + " has " + ((mm.needsExecution) ? ("") : ("no ")) +
          "changed inputs.");
    } else {
      if (mm.lastNewMethod === timestamp) {
        LOG(mm + " is a new method");
      } else {
        LOG(mm + " depends on the last set variable");
      }
    }

    if (mm.needsExecution) {
      /* Now that we have checked for both "is new method" and "has changed
       * inputs" conditions... */
      execute(mm);
    } else {
      LOG(mm + " will not be executed");
    }
  }