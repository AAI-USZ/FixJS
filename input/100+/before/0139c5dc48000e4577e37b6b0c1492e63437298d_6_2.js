function isPoisoned(vv) {
    /* If this variable has already been checked, then we can go home early. */
    if (vv.lastPoisoned === this.timestamp) return vv.isPoisoned;
    vv.lastPoisoned = this.timestamp;

    /* Base case: a blamed variable is poisoned. */
    if (vv.blamedBy > 0) {
      LOG(vv + " is a source of poison");
      return vv.isPoisoned = true;
    }

    /* Recursion: a variable can be poisoned by its ancestors. */
    var mm = vv.writtenBy;
    if (mm) {
      return vv.isPoisoned = mm.inputsUsed.some(function (uu) {
        var found = this.isPoisoned(uu);
        if (found) LOG(vv + " was poisoned by " + uu);
        return found;
      }, this);
    }

    /* If we got this far, then it must be healthy. */
    return false;
  }