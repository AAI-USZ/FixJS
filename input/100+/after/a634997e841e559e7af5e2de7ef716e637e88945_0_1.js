function enterFunction(node) {
    // Lift function's name to the parent scope
    if (node[1] !== null) context.vars[node[1]] = 'local';

    // Allocate one variable for compiler
    context = { vars: { '$$tmp': 'local' }, parent: context };

    // Add arguments to context
    node[2].forEach(function(arg) {
      context.vars[arg] = 'arg';
    });

    // Find all local variables and add them to context
    var body = node[3].map(traverseLocals);

    // Replace global.a with a if it's not in context
    body = node[3].map(traverseGlobals);

    // Add variable declarations
    if (Object.keys(context.vars).length > 0) {
      body = [['var'].concat([Object.keys(context.vars).map(function(name) {
        return [name];
      })])].concat(body);
    }

    context = context.parent;

    return ['function', node[1], node[2], body];
  }