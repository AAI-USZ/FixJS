function() {
    return assertParse(in5, "apply (apply (ref bind) (ref 1)) (lambda _ . ref 2)");
  }