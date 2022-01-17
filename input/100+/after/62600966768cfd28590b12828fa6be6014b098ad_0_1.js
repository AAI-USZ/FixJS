function(config) {
        
        if (config.map instanceof OpenLayers.Map) {
            this._map = config.map;
            delete config.map;
        }
        if (config.mapCenter instanceof OpenLayers.LonLat) {
            this._mapCenter = config.mapCenter;
            delete config.mapCenter;
        }
        if (config.mapExtent instanceof OpenLayers.Bounds) {
            this._mapExtent = config.mapExtent;
            delete config.mapExtent;
        }
        
        this.callParent(arguments);
        this.element.setVisibilityMode(Ext.Element.OFFSETS);
    
        if (!window.OpenLayers) {
            this.setHtml('OpenLayers is required');
        }
    }