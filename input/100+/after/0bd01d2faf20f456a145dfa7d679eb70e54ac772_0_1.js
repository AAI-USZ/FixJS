function(config) {
    // fix scroll behaviour
	config.map.controls = [
			new OpenLayers.Control.Navigation(
				{
				mouseWheelOptions:{cumulative:false}, 
				zoomWheelOptions: {interval: 1000}, 
				dragPanOptions: {enableKinetic: true}
				}),
			new OpenLayers.Control.PanPanel(),
			new OpenLayers.Control.ZoomPanel(),
			//new OpenLayers.Control.KeyboardDefaults(),
			new OpenLayers.Control.Attribution()
			];
        
        var mapUrl = window.location.hash.substr(1);
        var match = mapUrl.match(/^maps\/(\d+)$/);
        var bookm = mapUrl.match(/q=/);
        if (match) {
            this.id = Number(match[1]);
            OpenLayers.Request.GET({
                url: "../" + mapUrl,
                success: function(request) {
                    var addConfig = Ext.util.JSON.decode(request.responseText);
                    // Don't use persisted tool configurations from old maps
                    delete addConfig.tools;
                    addConfig.map.controls = config.map.controls;
                    this.applyConfig(Ext.applyIf(addConfig, config));
                },
                failure: function(request) {
                    var obj;
                    try {
                        obj = Ext.util.JSON.decode(request.responseText);
                    } catch (err) {
                        // pass
                    }
                    var msg = this.loadConfigErrorText;
                    if (obj && obj.error) {
                        msg += obj.error;
                    } else {
                        msg += this.loadConfigErrorDefaultText;
                    }
                    this.on({
                        ready: function() {
                            this.displayXHRTrouble(msg, request.status);
                        },
                        scope: this
                    });
                    delete this.id;
                    window.location.hash = "";
                    this.applyConfig(config);
                },
                scope: this
            });
		} else if (bookm) {
			var urlConf = unescape(mapUrl.split('=')[1]);
			var queryConfig = Ext.util.JSON.decode(urlConf);
			queryConfig.map.controls = config.map.controls;
			this.applyConfig(Ext.apply(config, queryConfig));
			window.location.hash = "";
        } else {
            var query = Ext.urlDecode(document.location.search.substr(1));
            if (query && query.q) {
                var queryConfig = Ext.util.JSON.decode(query.q);
                Ext.apply(config, queryConfig);
            }
            this.applyConfig(config);
        }
        
    }