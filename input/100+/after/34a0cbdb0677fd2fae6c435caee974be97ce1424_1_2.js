function(outvar  /*c.AbstractVariable*/,
                          expr    /*c.Expression*/,
                          subject /*c.AbstractVariable*/,
                          solver  /*ClTableau*/) {

    if (c.trace) {
      c.fnenterprint("CLE:substituteOut: " + outvar + ", " + expr + ", " + subject + ", ...");
      c.traceprint("this = " + this);
    }

    var terms = this.terms;
    var multiplier = terms.get(outvar);
    terms.delete(outvar);
    this.constant += (multiplier * expr.constant);
    expr.terms.each(function(clv, coeff) {
      var old_coeff = terms.get(clv);
      if (old_coeff) {
        var newCoeff = old_coeff + multiplier * coeff;
        if (c.approx(newCoeff, 0)) {
          solver.noteRemovedVariable(clv, subject);
          terms.delete(clv);
        } else {
          terms.set(clv, newCoeff);
        }
      } else {
        terms.set(clv, multiplier * coeff);
        if (solver) {
          solver.noteAddedVariable(clv, subject);
        }
      }
    });
    if (c.trace) c.traceprint("Now this is " + this);
  }