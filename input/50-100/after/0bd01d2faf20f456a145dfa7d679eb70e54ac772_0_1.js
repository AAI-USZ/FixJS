function(request) {
                    var addConfig = Ext.util.JSON.decode(request.responseText);
                    // Don't use persisted tool configurations from old maps
                    delete addConfig.tools;
                    addConfig.map.controls = config.map.controls;
                    this.applyConfig(Ext.applyIf(addConfig, config));
                }