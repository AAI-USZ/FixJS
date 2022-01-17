function isRelevant(vv) {
    LOG("is " + vv + " relevant now?");

    /* If this variable has already been checked, then we can go home early. */
    if (vv.lastIsRelevant === this.timestamp) {
      LOG((vv.isRelevant ? "yes" : "no" ));
      return vv.isRelevant;
    }
    vv.lastIsRelevant = this.timestamp;

    /* Base case: outputs are relevant. */
    if (vv.cellType === "output") {
      LOG(vv + " is relevant");
      return (vv.isRelevant = true);
    }

    /* Recursion: if I reach a relevant variable in the current evaluation
     * graph, then I am relevant. */
    vv.isRelevant = vv.usedBy.some(function (mm) {
      return mm.outputs.some(function (ww) {
        return this.isRelevant(ww);
      }, this);
    }, this);

    LOG(vv + " is" + (vv.isRelevant ? "" : " not") + " relevant");
    return vv.isRelevant;
  }