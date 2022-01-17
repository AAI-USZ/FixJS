function compile(node, name, _logger, options) {
    // The logger is closed over by all the functions.
    logger = _logger;
    var o = { name: name, logger: _logger, warn: warningOptions(options), jsInput: options['js-input'], memcheck: options.memcheck, compiler: "lljs" };

    jsFrontend.initialize(o);

    // Lift into constructors.
    node = T.lift(node);

    // Pass 1.
    var types = resolveAndLintTypes(node, clone(Types.builtinTypes));
    o.types = types;

    // Pass 1.5 - lifting vars into frame level lets
    if (options['js-input']) {
      node.jsRewrite(o);
    }

    // Pass 2.
    node.scan(o);

    // Pass 2.5 - include externs for all undeclared global vars
    if (options['js-input']) {
      node.externPass(o);
    }

    // Pass 2.6 - casting unsafe assignments
    if (options['js-input']) {
      node.jsCastPass(o);
    }

    // Pass 3.
    node = node.transform(o);

    // Pass 4.
    node = node.lower(o);

    if (options['lazy-minimum'] !== false) {
      o.options['lazy-minimum'] = 0;
      node.lazyParsePass(o);
    }

    return T.flatten(createModule(node, name, options.bare, options["load-instead"], options.memcheck));
  }