function(inScope) {
      return (this.condition.mayHaveSideEffects(inScope)) || (!this.condition.falsey() && this.block.mayHaveSideEffects(inScope));
    }