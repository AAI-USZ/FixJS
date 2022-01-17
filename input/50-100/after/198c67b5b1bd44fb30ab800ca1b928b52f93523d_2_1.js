function run(ast) {
  var context = emptyContext();
  
  for (i = 0; i < ast.length; i++) {
    var node = ast[i];
    context = node.evaluate(context);
  }

  return context;
}