function multiOutputPlanner() {
    LOG("    MOP: constraint to enforce = " + this.cccToEnforce);
    LOG("    MOP: free variables = " + this.freeVariableSet);

    while (!this.cccToEnforce.isSatisfied()
           && this.freeVariableSet.length > 0)
    {
      /* Remove an arbitrary element from the free variable set. */
      var vvvFree = this.freeVariableSet.shift();

      if (vvvFree.isFree()) {
        /* ccc = the Constraint to which vvvFree belongs whose mark equals
         * this.mark.upstream. */
        var ccc = null;
        var i;
        for (i = 0; i < vvvFree.constraints.length; ++i) {
          var ccci = vvvFree.constraints[i];
          if (ccci.mark === this.mark.upstream) {
            ccc = ccci;
            break;
          }
        }

        LOG("    MOP: free variable " +
            ((vvvFree) || ("(unknown)")) + " attached to " +
            ((ccc) || ("nothing")));

        /* mSelected = the method in ccc with the smallest number of outputs
         * such that they are all free variables. */
        var mmSelected = null;
        var mmNumOutputs = Number.MAX_VALUE;
        ccc.outer.methods.forEach(function (mm) {
          /* If this method has more outputs, move on. */
          if (mm.outputs.length >= mmNumOutputs) { return; }
          /* If this method has all free outputs, then select it. */
          var isAllFree = mm.outputs.every(function (ww) {
            return ww.inner.isFree();
          }, this);
          if (isAllFree) {
            mmSelected = mm;
            mmNumOutputs = mm.outputs.length;
          }
        }, this);

        /* If there exists such a method, ... */
        if (mmSelected) {
          this.eliminateConstraint(ccc, mmSelected);

          /* A variable that cannot be made the output of a constraint and
           * which is marked 'potentially_undetermined' is a potential
           * undetermined variable. */
        } else if (vvvFree.mark === Mark.POTENTIALLY_UNDETERMINED) {
          this.potentialUndeterminedVars.push(vvvFree);
        }
      } else if (vvvFree.mark === Mark.POTENTIALLY_UNDETERMINED) {
        this.potentialUndeterminedVars.push(vvvFree);
      }
    }

    LOG("    MOP: enforced " + this.cccToEnforce + "? " +
        this.cccToEnforce.isSatisfied());
  }