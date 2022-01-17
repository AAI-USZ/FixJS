function executeActions(actionsData, context, scope) {
  var scopeContainer = context.initialScope.create(scope);
  var savedContext = AS2Context.instance;
  try {
    AS2Context.instance = context;
    context.defaultTarget = scope;
    interpretActions(actionsData, scopeContainer, null, []);
  } finally {
    AS2Context.instance = savedContext;
  }
}