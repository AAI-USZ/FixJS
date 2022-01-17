function(clv /*c.AbstractVariable*/, value /*double*/, constant /*double*/) {
    if (c.GC) console.log("new c.Expression");
    this.constant = (typeof constant == "number" && !isNaN(constant)) ? constant : 0;
    this.terms = new c.HashTable();

    if (clv instanceof c.AbstractVariable) {
      this.terms.set(clv, typeof value == 'number' ? value : 1);
    } else if (typeof clv == "number") {
      if (!isNaN(clv)) {
        this.constant = clv;
      }
    }
  }