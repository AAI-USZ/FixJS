function(inScope) {
        if (this.condition.isFalsey()) {
          if (this.condition.mayHaveSideEffects(inScope)) {
            return this.condition;
          } else {
            return (new Null).g();
          }
        }
        if (this.condition.isTruthy()) {
          if (!this.condition.mayHaveSideEffects(inScope)) {
            return new Loop(this.block);
          }
        }
        return this;
      }