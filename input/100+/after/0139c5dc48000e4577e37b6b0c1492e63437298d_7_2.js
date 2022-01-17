function canBeRelevant(vv) {
    LOG("can " + vv + " be relevant?");

    /* If this variable has already been checked, then we can go home early. */
    if (vv.lastCanBeRelevant === this.timestamp) {
      LOG((vv.canBeRelevant ? "yes" : "no"));
      return vv.canBeRelevant;
    }
    vv.lastCanBeRelevant = this.timestamp;

    /* Base case: relevant variables can be relevant. */
    if (this.isRelevant(vv)) {
      LOG(vv + " can be relevant");
      return (vv.canBeRelevant = true);
    }

    /* Recursion: if I am relevant, or after being touched, I can change the
     * solution graph to become relevant, then I can be relevant. */
    var mm = vv.writtenBy;
    /* If I am not written, or written by a one-way constraint, then touching
     * me will not change the solution. */
    if (!(mm && mm.constraint)) {
      LOG(vv + " cannot be relevant");
      return (vv.canBeRelevant = false);
    }

    LOG("finding ways to be relevant by changing the constraint writing it...");
    var mmPeers = mm.constraint.methods;
    vv.canBeRelevant = mmPeers.some(function (nn) {
      /* Only methods that do not write to us could be selected after we are
       * touched. */
      if (nn.outputs.has(vv)) {
        return false;
      }

      /* Otherwise, if it has outputs that can be relevant, then we can be
       * relevant too. */
      return nn.outputs.some(function (ww) {
        return this.canBeRelevant(ww);
      }, this);
    }, this);

    LOG(vv + " can" + (vv.canBeRelevant ? "" : "not") + " be relevant");
    return vv.canBeRelevant;
  }