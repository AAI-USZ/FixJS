function(inScope) {
          if (this.condition.isFalsey()) {
            if (this.condition.mayHaveSideEffects(inScope)) {
              return this.condition;
            } else {
              return (new Undefined).g();
            }
          }
          if (this.condition.isTruthy()) {
            if (!this.condition.mayHaveSideEffects(inScope)) {
              if (this.block == null) {
                return (new Undefined).g();
              }
              if (this instanceof Loop) {
                return this;
              }
              return (new Loop(this.block)).g();
            }
          }
          return this;
        }