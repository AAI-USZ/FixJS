function (solutionId, handlerResponse) {
        var unValued = fluid.model.transform(handlerResponse, gpii.lifecycleManager.responseToSnapshotRules, 
            {isomorphic: true});
        return fluid.get(unValued, fluid.pathUtil.composePath(fluid.pathUtil.escapeSegment(solutionId), "0"), {
            parser: {
                parse: fluid.pathUtil.parseEL,
                compose: fluid.pathUtil.composePath
            },
            strategies: [fluid.model.defaultFetchStrategy]
        });
    }