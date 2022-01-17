function(config) {
        
        if (config.map instanceof OpenLayers.Map) {
            this._map = config.map;
            delete config.map;
        }
        
        this.callParent(arguments);
        this.element.setVisibilityMode(Ext.Element.OFFSETS);
    
        if (!window.OpenLayers) {
            this.setHtml('OpenLayers is required');
        }
    }