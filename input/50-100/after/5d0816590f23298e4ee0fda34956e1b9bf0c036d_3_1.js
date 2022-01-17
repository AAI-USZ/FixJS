function maybeSet(vv) {
    LOG("maybeSet: " + vv);

    /* Mark variables as visited to cache result of lazy evaluation. */
    if (vv.lastMaybeChanged === timestamp) {
      return;
    }
    vv.lastMaybeChanged = timestamp;

    var mm = vv.writtenBy;
    if (mm) {
      LOG(vv + " written by " + mm);
      ASSERT(mm.outputs.has(vv),
        vv + " not actually written by " + mm);
      maybeExecute(mm);
    } else {
      /* We will only check this once. */
      set(vv);
    }
  }