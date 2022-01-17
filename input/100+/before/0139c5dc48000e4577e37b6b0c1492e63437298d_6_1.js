function update(touchedSet, newMethods, droppedInputs, changedSet,
                      timestamp)
  {
    LOG("Starting analysis for activation behavior...");

    var isFirstUpdate = (this.timestamp === undefined)
    this.timestamp = timestamp;

    /* We don't need to check outputs if no invariants changed. */
    var invChanged = false;

    changedSet.forEach(function (vv) {
      if (vv.cellType === "invariant") {
        invChanged = true;
        /* Do not forgive variables on the first update. Always blame when the
         * invariant is false. */
        var increment = (vv.value ? (isFirstUpdate ? 0 : -1) : 1);
        this.blame(vv, increment);
      }
    }, this);

    if (invChanged) {
      this.outputs.forEach(function (vv) {
        LOG("checking " + vv + " for poison...");
        var canBeDisabledPrev = vv.canBeDisabled;
        vv.canBeDisabled = this.isPoisoned(vv);
        LOG(vv + " can " + ((vv.canBeDisabled) ? ("") : ("not ")) +
            "be deactivated");
        if (vv.canBeDisabled !== canBeDisabledPrev) {
          vv.publish("canBeDisabled", vv);
        }
      }, this);
    }

    LOG("Finished analysis for activation behavior.");
  }