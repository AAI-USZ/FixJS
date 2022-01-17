function(inScope) {
          if ((this.right["instanceof"](Identifier)) && this.right.data === 'eval') {
            return this;
          }
          if (!this.left.mayHaveSideEffects(inScope)) {
            return this.right.r(this.raw).p(this.line, this.column);
          }
          return this;
        }