function (nn) {
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
    }