function(clv, coeff) {
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
    }