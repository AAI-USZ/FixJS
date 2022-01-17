function (expression, context) {
        context.entityType = expression.entityType;
        this.Visit(expression.source, context);
    }