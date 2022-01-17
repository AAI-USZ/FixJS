function(json) {
                mod.setTimestamp(json.timestamp);
                mod.setShowInstances(json.instances);
                fnCallback(json);
            }