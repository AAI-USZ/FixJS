function (source, rules, options) {
        options = options || {};
        var parser = {
            parse: fluid.pathUtil.parseEL,
            compose: fluid.pathUtil.composePath
        };
        var getConfig = {
            parser: parser,
            strategies: [fluid.model.defaultFetchStrategy]
        };
        var schemaStrategy = fluid.model.transform.decodeStrategy(source, options, getConfig);
        var setConfig = {
            parser: parser,
            strategies: [fluid.model.defaultFetchStrategy, schemaStrategy ? fluid.model.transform.schemaToCreatorStrategy(schemaStrategy)
                : fluid.model.defaultCreatorStrategy]
        };
        var expander = {
            source: source,
            target: schemaStrategy ? fluid.model.transform.defaultSchemaValue(schemaStrategy(null, "", "")) : {},
            resolverGetConfig: getConfig,
            queued: []
        };
        fluid.model.transform.makeExpander(expander, fluid.model.transform.handleExpandExpander);
        expander.applier = fluid.makeChangeApplier(expander.target, {resolverSetConfig: setConfig});
        
        expander.expand(rules);
        if (expander.queued.length > 0) {
            expander.typeStack = [];
            expander.pathOp = fluid.model.makePathStack(expander, "path");
            fluid.model.transform.expandWildcards(expander, source);
        }
        return expander.target;
        
    }