function maybeMarkCanBeDisabled(vv)
  {
    /* If this variable has already been checked, then we can go home early. */
    if (vv.lastCanBeDisabled === this.timestamp) return;
    vv.lastCanBeDisabled = this.timestamp;

    /* Only interface variables can be disabled. */
    if (vv.cellType !== "interface") return;

    var canBeDisabledPrev = vv.canBeDisabled;
    /* TODO: Should we enable if it is violating a precondition? */
    vv.canBeDisabled = (!this.canBeRelevant(vv));
    LOG(vv + " can " + (vv.canBeDisabled ? "" : "not ") + "be disabled");
    if (vv.canBeDisabled !== canBeDisabledPrev) {
      vv.publish("canBeDisabled", vv.canBeDisabled);
      
      /* If I changed, then my neighbors might as well. */
      var vvv = vv.inner;
      if (vvv) {
        vvv.constraints.forEach(function (ccc) {
          ccc.variables.forEach(function (vvvPeer) {
            this.maybeMarkCanBeDisabled(vvvPeer.outer);
          }, this);
        }, this);
      }
    }
  }