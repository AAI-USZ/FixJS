function get(vv) {
    LOG("get: " + vv);

    if (caller == vv.writtenBy) {
      vv.dependsOnSelf = true;
      /* Break cycle by returning old value. */
      LOG("return last " + vv + " == " + JSON.stringify(vv.value));
      /* Return the last value the user assigned. We do not want to call
       * set() with a value that will be overwritten (leading to two calls to
       * set() with new values), but we do want to call set() once with the
       * overwriting value. 
       * In the case where the overwriting value would be the same as what
       * the user assigned, then we would not call set() at all if we copied
       * the user's value over to valuePrev. */
      return vv.value;
    }

    maybeSet(vv);

    if (caller) {
      /* Do not establish this link between a variable and its writer (i.e. for
       * self-loops).  We do not want to call a variable's writer by setting the
       * variable - this will lead to two calls to set() - and we can avoid a
       * check against writtenBy during traversal (e.g. during behavior updates)
       * by just leaving it out of usedBy. */
      caller.inputsUsed.setInsert(vv);
      vv.usedBy.setInsert(caller);
    }

    LOG("return " + vv + " == " + JSON.stringify(vv.value));
    return vv.value;
  }