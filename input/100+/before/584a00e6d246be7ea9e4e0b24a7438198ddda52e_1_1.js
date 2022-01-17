function (source, rules, options) {
        options = options || {};
        var schemaStrategy = fluid.model.transform.decodeStrategy(source, options);
        var getConfig = {
            parser: fluid.pathUtil.parseEL,
            strategies: [fluid.model.defaultFetchStrategy]
        };
        var setConfig = {
            parser: fluid.pathUtil.parseEL,
            strategies: [fluid.model.defaultFetchStrategy, schemaStrategy ? fluid.model.transform.schemaToCreatorStrategy(schemaStrategy)
                : fluid.model.defaultCreatorStrategy]
        };
        var expander = {
            source: source,
            target: schemaStrategy? fluid.model.transform.defaultSchemaValue(schemaStrategy(null, "", "")) : {},
            resolverGetConfig: getConfig,
            queued: []
        };
        fluid.model.transform.makeExpander(expander, fluid.model.transform.expandValue);
        expander.outputPrefixOp = fluid.model.makePathStack(expander, "outputPrefix");
        expander.inputPrefixOp = fluid.model.makePathStack(expander, "inputPrefix");
        expander.applier = fluid.makeChangeApplier(expander.target, {resolverSetConfig: setConfig});
        
        expander.expand(rules);
        if (expander.queued.length > 0) {
            expander.typeStack = [];
            expander.pathOp = fluid.model.makePathStack(expander, "path");
            fluid.model.transform.expandWildcards(expander, source);
        }
        return expander.target;
        
    }