function() {
        var protocol = new OpenLayers.Protocol.WFS({
            url: this.WFSURL,
            geometryName: this.geometryName,
            srsName: this.target.mapPanel.map.getProjection(),
            formatOptions: {
                featureNS: 'http://mapserver.gis.umn.edu/mapserver',
                autoconfig: false
            }
        });
        var externalProtocol = new OpenLayers.Protocol.WFS({
            url: this.WFSURL + "?EXTERNAL=true",
            geometryName: this.geometryName,
            srsName: this.target.mapPanel.map.getProjection(),
            formatOptions: {
                featureNS: 'http://mapserver.gis.umn.edu/mapserver',
                autoconfig: false
            }
        });
        // we overload findLayers to avoid sending requests
        // when we have no sub-layers selected
        return new OpenLayers.Control.GetFeature({
            internalProtocol: protocol,
            externalProtocol: externalProtocol,
            box: true, 
            click: true, 
            single: false, 
            clickTolerance: this.clickTolerance, 
            WFSTypes: this.WFSTypes,
            externalWFSTypes: this.externalWFSTypes,
            enableWMTSLayers: this.enableWMTSLayers, 
            eventListeners: {
                beforefeatureselected: function() {
                    this.events.fireEvent('querystarts');
                },
                featuresselected: function(e) {
                    this.events.fireEvent('queryresults', e.features);
                },
                activate: function() {
                    this.events.fireEvent('queryopen');
                },
                deactivate: function() {
                    this.events.fireEvent('queryclose');
                },
                scope: this
            },
            request: function() {
                var olLayers = this.map.getLayersByClass("OpenLayers.Layer.WMS");
                if (this.enableWMTSLayers) {
                    olLayers = olLayers.concat(
                        this.map.getLayersByClass("OpenLayers.Layer.WMTS")
                    );
                }
                var internalLayers = [];
                var externalLayers = [];
                Ext.each(olLayers, function(layer) {
                    if (layer.getVisibility() === true) {
                        var layers = layer.params.LAYERS || layer.mapserverLayers;
                        if (Ext.isArray(layers)) {
                            layers = layers.join(',');
                        }
                        layers = layers.split(',');
                        for (var j = 0, lenj = layers.length ; j < lenj ; j++) {
                            for (var i = 0, leni = this.WFSTypes.length ; i < leni ; i++) {
                                if (this.WFSTypes[i] === layers[j]) {
                                    internalLayers.push(this.WFSTypes[i]);
                                    break;
                                }
                            }
                            for (var k = 0, lenk = this.externalWFSTypes.length ; k < lenk ; k++) {
                                if (this.externalWFSTypes[k] === layers[j]) {
                                    externalLayers.push(this.externalWFSTypes[k]);
                                    break;
                                }
                            }
                        }
                    }
                }, this);
                this.internalProtocol.format.featureType = internalLayers;
                this.externalProtocol.format.featureType = externalLayers;
                if (internalLayers.length > 0) {
                    this.protocol = this.internalProtocol;
                    OpenLayers.Control.GetFeature.prototype.request.apply(this, arguments);
                }
                if (externalLayers.length > 0) {
                    this.protocol = this.externalProtocol;
                    OpenLayers.Control.GetFeature.prototype.request.apply(this, arguments);
                }
            }
        });
    }