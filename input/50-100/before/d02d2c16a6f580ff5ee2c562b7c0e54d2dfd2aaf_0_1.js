function (handlerSpec) {
            // first prepare the payload for the settingsHandler in question - a more efficient
            // implementation might bulk together payloads destined for the same handler 
            var settingsHandlerPayload = gpii.lifecycleManager.specToSettingsHandler(solutionId, handlerSpec);
            //send the payload to the settingsHandler
            var handlerResponse = fluid.invokeGlobalFunction(handlerSpec.type, [settingsHandlerPayload]);
            var settingsSnapshot = gpii.lifecycleManager.responseToSnapshot(solutionId, handlerResponse);
            var invariant = fluid.model.transform(handlerSpec, gpii.lifecycleManager.invariantSettings);
            return $.extend(true, {}, handlerSpec, settingsSnapshot);
            //update the settings section of our snapshot to contain the new format
        }