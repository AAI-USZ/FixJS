function(inScope) {
      return (this.expr.mayHaveSideEffects(inScope)) || (beingDeclared(this.assignee)).length;
    }