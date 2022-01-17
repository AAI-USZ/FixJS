function (source, options) {
        if (options.isomorphic) {
            return fluid.model.transform.isomorphicSchemaStrategy(source);
        }
        else if (options.flatSchema) {
            return fluid.model.transform.flatSchemaStrategy(options.flatSchema);
        }
    }