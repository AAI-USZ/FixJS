function compile(name, logName, source, options) {
    // -W anything infers -W.
    for (var p in options) {
      if (p.charAt(0) === "W") {
        options.warn = true;
        break;
      }
    }

    var logger = new util.Logger("ljc", logName, source, options);
    var code;

    try {
      var node = esprima.parse(source, { loc: true, comment: true, range: true, tokens: true, jsInput: (options["js-input"] !== false) });

      node = escodegen.attachComments(node, node.comments, node.tokens);

      if (options["only-parse"]) {
        code = node;
      } else {
        node = compiler.compile(node, name, logger, options);
        if (options["emit-ast"]) {
          code = node;
        } else {
          code = escodegen.generate(node, { base: "", indent: "  ", comment: true });
        }
      }
    } catch (e) {
      if (mode === BROWSER) {
        throw e;
      }

      if (e.index) {
        // Esprima error, make a loc out of it.
        var lc = { line: e.lineNumber, column: e.column - 1 };
        e.loc = { start: lc, end: lc };
        logger.error(e.message, { start: lc, end: lc });
        logger.flush();
        quit(1);
      }

      if (e.logged && mode !== BROWSER) {
        // Compiler error that has already been logged, so just flush and
        // quit.
        logger.flush();
        quit(1);
      }

      throw e;
    }

    logger.flush();
    return code;
  }