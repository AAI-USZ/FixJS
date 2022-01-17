function(err) {
    var optimiser, result;
    if (err != null) {
      throw err;
    }
    result = null;
    try {
      input = Preprocessor.processSync(input);
    } catch (e) {
      console.error(e.stack || e.message);
      process.exit(1);
    }
    if (options.debug) {
      console.error('### PREPROCESSED ###');
      console.error(numberLines(humanReadable(input.trim())));
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
    if (options.debug && (result != null)) {
      console.error('### PARSED ###');
      console.error(inspect(result.toJSON()));
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
    } else if (options.optimise && options.debug && (result != null)) {
      console.error('### OPTIMISED ###');
      return console.error(inspect(result.toJSON()));
    }
  }