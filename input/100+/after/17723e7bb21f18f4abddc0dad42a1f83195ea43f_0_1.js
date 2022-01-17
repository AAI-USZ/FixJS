function(config) {
        
        var mapUrl = window.location.hash.substr(1);
        var match = mapUrl.match(/^maps\/(\d+)$/);
        if (match) {
            this.id = Number(match[1]);
            OpenLayers.Request.GET({
                url: "../" + mapUrl,
                success: function(request) {
                    var addConfig = Ext.util.JSON.decode(request.responseText);
                    // Don't use persisted tool configurations from old maps
                    delete addConfig.tools;
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
        } else {
            var query = Ext.urlDecode(document.location.search.substr(1));
            if (query) {
                if (query.q) {
                    var queryConfig = Ext.util.JSON.decode(query.q);
                    Ext.apply(config, queryConfig);
                }
                /**
                 * Special handling for links from local GeoServer.
                 *
                 * The layers query string value indicates layers to add as 
                 * overlays from the local source.
                 *
                 * The bbox query string value indicates the initial extent in
                 * the current map projection.
                 */
                 if (query.layers) {
                     var layers = query.layers.split(/\s*,\s*/);
                     for (var i=0,ii=layers.length; i<ii; ++i) {
                         config.map.layers.push({
                             source: "local",
                             name: layers[i],
                             title: layers[i],
                             visibility: true
                         });
                     }
                 }
                 if (query.bbox) {
                     delete config.map.zoom;
                     delete config.map.center;
                     config.map.extent = query.bbox.split(/\s*,\s*/);
                 }
            }
            
            this.applyConfig(config);
        }
        
    }