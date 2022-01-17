function() {
      deepEqual(data.Number(3), funcs.neg([data.Number(-3)]), "simple negation");
      deepEqual(data.Number(-14), funcs.neg([funcs.neg([data.Number(-14)])]), "a number is its own double negative");
    }