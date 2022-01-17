function() {
          if (!((this.expr["instanceof"](ObjectInitialiser)) && this.expr.isOwn && this.expr.members.length === 0)) {
            return this;
          }
          return (new ArrayInitialiser([])).g().r(this.raw).p(this.line, this.column);
        }