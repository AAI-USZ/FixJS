function(settingsarray) {
        var app = fluid.copy(settingsarray);
        for (var appId in app) {
            for (var j = 0; j < app[appId].length; j++) {
                var schemaId = app[appId][j].options.schema;
                var settings = app[appId][j].settings;
                if (settings === null) {
                    var keys = nodeGSettings.get_gsetting_keys(schemaId);
                    app[appId][j].settings = {};
                    for (var k = 0; k < keys.length; k++) {
                        var key = keys[k];
                        app[appId][j].settings[key] = nodeGSettings.get_gsetting(schemaId,key);
                    }
                }
                else {
                    for (var settingKey in settings) {
                        settings[settingKey] = nodeGSettings.get_gsetting(schemaId,settingKey);
                    }

                }
            }
        }
        return app;
    }