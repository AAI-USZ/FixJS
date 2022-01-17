function (solutionId, handlerResponse) {
        var unValued = fluid.model.transform(handlerResponse, gpii.lifecycleManager.responseToSnapshotRules, 
            {isomorphic: true});
        // TODO: Should eventually be able to do this final stage through transformation too
        return unValued[solutionId][0];
    }