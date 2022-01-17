function(inScope) {
      var _ref1;
      return ((_ref1 = this.parent) != null ? _ref1.mayHaveSideEffects(inScope) : void 0) || (this.nameAssignment != null) && (this.name || (beingDeclared(this.nameAssignment)).length > 0);
    }