function set(vv) {
    /* Do not notify anyone if our value did not actually change. */
    if (!vv.isChanged()) {
      DEBUG_BEGIN;
      if (vv.writtenBy) {
        /* If this variable is computed, then set() will be called only by
         * its writer. */
        LOG("output " + vv + " was unchanged");
      } else {
        /* If this variable is a source, then set() will be called with the
         * same value only by maybeSet. */
        LOG("source " + vv + " was edited but unchanged");
      }
      DEBUG_END;
      return;
    }

    /* You may call set() with a new value only once during evaluation. If
     * you could call it with a new value more than once, methods would have
     * to be executed multiple times, and we want to avoid that. Identity
     * assignments can be made multiple times. */
    if (vv.lastChanged === timestamp) {
      ERROR("do not call set() more than once during evaluation: " +
            vv + " @ " + timestamp);
      return;
    }

    /* Assign. */
    vv.lastChanged = timestamp;

    /* Notify subscribers later. */
    changedSet.push(vv);
    vv.publishChange();

    /* Do not clear usedBy here. Methods will remove themselves before they
     * are executed. In a self-loop, clearing usedBy here will forget
     * a use from the current evaluation. */
    /* However, usedBy will change as we execute each method in it. We need to
     * copy it first, or iteration will be broken. */

    var usedByPrev = vv.usedBy.slice();
    usedByPrev.forEach(function (mm) {
      ASSERT(mm !== vv.writtenBy,
        "do not establish a usedBy link for self-loops");
      if (mm.isSelected) {
        LOG(mm + " used " + vv + " during the last evaluation");
        /* Small optimization to prevent checking other inputs before
         * execution. */
        mm.needsExecution = true;
        /* Call maybeExecute() instead of execute() so that it gets marked as
         * visited. */
        maybeExecute(mm);
      //} else {
        /* The method that replaced this one in the solution will be executed
         * directly by update(). */
      }
    });
  }