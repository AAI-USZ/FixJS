function(inScope) {
          if ((this.right["instanceof"](Identifier)) && this.right.data === 'eval') {
            return this;
          }
          if (!this.left.mayHaveSideEffects(inScope)) {
            return this.right;
          }
          return this;
        }