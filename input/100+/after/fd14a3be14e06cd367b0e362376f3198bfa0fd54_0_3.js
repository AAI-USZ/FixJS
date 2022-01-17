function match(candidate, patterns) {
    var pattern, result;
    for (pattern in patterns) {
      if(patterns.hasOwnProperty(pattern)) {

        if (buffer.hasOwnProperty(pattern)) {
          match_function = buffer[pattern];
        }

        else {
          AST = mm.makeParser(pattern).parse();
          match_function = mm.makeCompiler(AST).compile();
          buffer[pattern] = match_function;
        }

        result = match_function (candidate);
        if(result.result) {
          handler = patterns[pattern];
          if (typeof handler === 'string') {
            handler = new Function (handler);
          }

          return handler.call(result.context);
        }
      }
    }

    /**
     * No patterns matched. In this case we throw an exception. You
     * can always prevent this with catching '_'.
     */
     throw "Non-exhaustive patterns";
  }