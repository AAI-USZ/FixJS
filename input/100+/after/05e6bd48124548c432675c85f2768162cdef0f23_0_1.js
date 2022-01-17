function() {
        if (!this.wmsBrowser) {
            var layers = []
            Ext.each(this.target.mapPanel.map.layers, function(layer) {
                if (layer.visibility && layer.group == 'background') {
                    layers.push(layer.clone());
                }
            });
            var config = {
                border: false,
                zoomOnLayerAdded: true,
                closeOnLayerAdded: false,
                mapPanelPreviewOptions: {
                    height: 170,
                    collapsed: false,
                    extent: this.target.mapPanel.map.getExtent(),
                    map: {
                        projection: this.target.mapPanel.map.projection,
                        maxExtent: this.target.mapPanel.map.maxExtent,
                        restrictedExtent: this.target.mapPanel.map.restrictedExtent,
                        units: this.target.mapPanel.map.units,
                        resolutions: this.target.mapPanel.map.resolutions,
                        controls: [
                            new OpenLayers.Control.Navigation(),
                            new OpenLayers.Control.Zoom()
                        ]
                    },
                    layers: layers,
                    style: {
                        'padding': '0 0 0 10px'
                    },
                    collapsible: false
                },
                layerStore: this.target.mapPanel.layers,
                listeners: this.layerTreeId && this.target.tools[this.layerTreeId] ? {
                    "layeradded":  this.onLayerAdded,
                    scope: this
                } : {}
            };
            this.wmsBrowser = new GeoExt.ux.WMSBrowser(config);
        }
        return this.wmsBrowser;
    }