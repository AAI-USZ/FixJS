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
            if (this instanceof Loop) {
              return this;
            }
            return (new Loop(this.block)).g().r(this.raw).p(this.line, this.column);
          }
        }
        return this;
      }