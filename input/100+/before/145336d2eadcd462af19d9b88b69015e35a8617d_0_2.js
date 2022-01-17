function(err) {
    var optimiser, result;
    if (err != null) {
      throw err;
    }
    result = null;
    console.log(numberLines(input.trim()));
    try {
      input = Preprocessor.processSync(input);
    } catch (e) {
      console.error(e.stack || e.message);
      process.exit(1);
    }
    try {
      result = parser.parse(input);
    } catch (e) {
      if (!(e instanceof parser.SyntaxError)) {
        throw e;
      }
      printParserError(e);
      process.exit(1);
    }
    if (options.optimise && (result != null)) {
      optimiser = new Optimiser;
      try {
        result = optimiser.optimise(result);
      } catch (e) {
        console.error(e.stack || e.message);
        process.exit(1);
      }
    }
    if (options.parse) {
      if (result != null) {
        console.log(inspect(result.toJSON()));
        return process.exit(0);
      } else {
        return process.exit(1);
      }
    }
  }