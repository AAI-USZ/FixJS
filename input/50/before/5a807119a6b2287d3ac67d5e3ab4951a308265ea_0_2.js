function (vv) {
      /* We want to make sure we do not call set() on a variable multiple times
       * during the same evaluation phase. Ignore a variable that may have been
       * edited after the last update, but is due to be overwritten because of a
       * more recent edit. The variable might also depend on itself, but we took
       * care of that case above. */
      if (!vv.writtenBy) {
        /* A variable may have been read and written by a method that no
         * longer exists in the solution. The dependsOnSelf flag will be
         * reset if it is written by another method in the solution. If it
         * is not written by any method, we must reset it here. */
        vv.dependsOnSelf = false;
        set(vv);
      }
    }