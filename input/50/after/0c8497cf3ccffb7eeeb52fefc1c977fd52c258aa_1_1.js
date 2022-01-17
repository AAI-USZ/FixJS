function() {
          if ((this.block != null) && this.block.mayHaveSideEffects([])) {
            return this;
          } else {
            return new Program(null);
          }
        }