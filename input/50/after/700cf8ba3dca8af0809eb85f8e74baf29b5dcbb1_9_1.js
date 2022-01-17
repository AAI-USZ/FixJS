function (vv) {
      /* We want to make sure we do not call set() on a variable multiple times
       * during the same evaluation phase. Ignore a variable that may have been
       * edited after the last update, but is due to be overwritten because of a
       * more recent edit. The variable might also depend on itself, but we took
       * care of that case above. */
      if (!vv.writtenBy) {
        /* Call `maybeSet` instead of `set` here. If two source variables are
         * inputs to the same method, then calling `set` on one input here
         * will cause the method to be executed, which will call `get` ->
         * `maybeSet` -> `set` on the other input. We do not want to call
         * `set` on it again if it comes later in the `touchedSet`. */
        maybeSet(vv);
      }
    }