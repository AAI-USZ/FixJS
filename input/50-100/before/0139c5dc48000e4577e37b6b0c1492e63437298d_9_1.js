function constraint(variables) {
    /* This parameter is optional in most cases. It is used to inform the
     * solver of variables that are input-only to this constraint. If the
     * solver does not know about them, it may choose a cyclic solution. */
    if (!variables) variables = [];
    /* Provide short-cut for single variable. */
    if (!Array.isArray(variables)) variables = [variables];
    variables = variables.map(function (proxy) {
      ASSERT(hd.isVariable(proxy),
        "expected variable as subject of constraint");
      return proxy.unwrap();
    });

    return new ConstraintFactory(variables);
  }