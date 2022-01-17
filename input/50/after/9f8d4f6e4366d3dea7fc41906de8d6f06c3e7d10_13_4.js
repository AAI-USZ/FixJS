function() {
    return assertParse("macroCons 1 nil", "apply (apply (ref cons) (lit 1)) (ref nil)");
  }