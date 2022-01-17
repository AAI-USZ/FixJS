function compile(node, name, _logger, options) {
    // The logger is closed over by all the functions.
    logger = _logger;

    // Lift into constructors.
    node = T.lift(node);

    // Pass 1.
    var types = resolveAndLintTypes(node, clone(Types.builtinTypes));
    var o = { types: types, name: name, logger: _logger, warn: warningOptions(options), jsInput: options['js-input'] };

    if (options['js-input']) {
      node.jsRewrite(o);
    }

    // Pass 2.
    node.scan(o);

    node.externPass(o);

    // Pass 3.
    node = node.transform(o);
    // Pass 4.
    node = node.lower(o);

    return T.flatten(createModule(node, name, options.bare, options["load-instead"]));
  }