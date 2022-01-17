function run(ast) {
  var context = {
    'local': {},
    'global': {},
    'value': null
  };

  for (i = 0; i < ast.length; i++) {
    var node = ast[i];
    context = evaluate(node, context);
  }

  return context;
}