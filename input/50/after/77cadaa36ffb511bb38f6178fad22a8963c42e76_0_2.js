function(inScope) {
      return (this.condition.mayHaveSideEffects(inScope)) || (!this.condition.isFalsey() && this.block.mayHaveSideEffects(inScope));
    }