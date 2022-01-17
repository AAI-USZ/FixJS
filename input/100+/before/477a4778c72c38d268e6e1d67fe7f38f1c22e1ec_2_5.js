function (source, rules) {
        var expander = {
            source: source,
            target: fluid.freshContainer(source),
            queued: []
        };
        fluid.model.transform.makeExpander(expander, fluid.model.transform.expandValue);
        expander.outputPrefixOp = fluid.model.makePathStack(expander, "outputPrefix");
        expander.inputPrefixOp = fluid.model.makePathStack(expander, "inputPrefix");
        
        expander.expand(rules);
        if (expander.queued.length > 0) {
            expander.typeStack = [];
            expander.pathOp = fluid.model.makePathStack(expander, "path");
            fluid.model.transform.expandWildcards(expander, source);
        }
        return expander.target;
        
    }