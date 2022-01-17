function(clv, coeff) {
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
    }