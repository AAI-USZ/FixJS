function (expression, context) {
        var valueType = Container.getTypeName(expression.value);
        context.value = this.provider.fieldConverter.toDb[Container.resolveName(Container.resolveType(valueType))](expression.value);
    }