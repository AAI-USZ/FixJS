function() {
          if (!((this.expr["instanceof"](ArrayInitialiser)) && this.expr.members.length === 0)) {
            return this;
          }
          return (new ArrayInitialiser([])).g();
        }