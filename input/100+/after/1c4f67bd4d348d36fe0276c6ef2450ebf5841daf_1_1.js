function executeActions(actionsData, context, scope) {
  var actionTracer = ActionTracerFactory.get();

  var scopeContainer = context.initialScope.create(scope);
  var savedContext = AS2Context.instance;
  try {
    AS2Context.instance = context;
    context.defaultTarget = scope;
    actionTracer.message('ActionScript Execution Starts');
    actionTracer.indent();
    interpretActions(actionsData, scopeContainer, null, []);
  } finally {
    actionTracer.unindent();
    actionTracer.message('ActionScript Execution Stops');
    AS2Context.instance = savedContext;
  }
}