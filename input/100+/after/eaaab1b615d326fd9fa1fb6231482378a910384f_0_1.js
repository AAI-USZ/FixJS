function addBinding(commandID, keyBindings, platform) {
        if ((commandID === null) || (commandID === undefined) || !keyBindings) {
            return;
        }
        
        var normalizedBindings = [],
            targetPlatform,
            results;

        if (Array.isArray(keyBindings)) {
            var keyBinding;
            results = [];
                                            
            keyBindings.forEach(function (keyBindingRequest) {
                keyBinding = _addBinding(commandID, keyBindingRequest, keyBindingRequest.platform);
                
                if (keyBinding) {
                    results.push(keyBinding);
                }
            });
        } else {
            results = _addBinding(commandID, keyBindings, platform);
        }
        
        return results;
    }