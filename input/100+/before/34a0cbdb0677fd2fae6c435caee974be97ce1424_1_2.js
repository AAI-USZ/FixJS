function(outvar /*c.AbstractVariable*/,
                          expr /*c.Expression*/,
                          subject /*c.AbstractVariable*/,
                          solver /*ClTableau*/) {
    if (c.trace) {
      c.fnenterprint("CLE:substituteOut: " + outvar + ", " + expr + ", " + subject + ", ...");
      c.traceprint("this = " + this);
    }
    var multiplier = this.terms.get(outvar);
    this.terms.delete(outvar);
    this.constant += (multiplier * expr.constant);
    expr.terms.each(function(clv, coeff) {
      var old_coeff = this.terms.get(clv);
      if (old_coeff) {
        var newCoeff = old_coeff + multiplier * coeff;
        if (c.approx(newCoeff, 0)) {
          solver.noteRemovedVariable(clv, subject);
          this.terms.delete(clv);
        } else {
          this.terms.set(clv, newCoeff);
        }
      } else {
        this.terms.set(clv, multiplier * coeff);
        if (solver) solver.noteAddedVariable(clv, subject);
      }
    }, this);
    if (c.trace) c.traceprint("Now this is " + this);
  }