function() {
    return assertParse(in6, "apply (apply (ref bind) (apply (ref ret) (lit 3))) (lambda a . apply (lambda b . apply (ref pr) (ref a)) (apply (apply (ref +) (ref a)) (lit 1)))");
  }