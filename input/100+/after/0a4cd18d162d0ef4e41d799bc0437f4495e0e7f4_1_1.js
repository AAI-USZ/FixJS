function() {
          if (this.block.mayHaveSideEffects([])) {
            return this;
          } else {
            return new Program(null);
          }
        }