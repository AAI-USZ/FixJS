function (solutionId, handlerResponse) {
        var unValued = fluid.model.transform(handlerResponse, gpii.lifecycleManager.responseToSnapshotRules, 
            {isomorphic: true});
        // TODO: Should eventually be able to do this final stage through transformation too
        return fluid.get(unValued, fluid.model.escapedPath(solutionId, "0"), {
            parser: {
                parse: fluid.pathUtil.parseEL,
                compose: fluid.pathUtil.composePath
            },
            strategies: [fluid.model.defaultFetchStrategy]
        });
    }