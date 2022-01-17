function(json) {
                mod.setTimestamp(json.timestamp);
                mod.setShowInstances(json.instances);
                mod.getSelectedCursors();
                fnCallback(json);
            }