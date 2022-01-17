function() {
        
        this.callParent();
        
        // check config-property map for an existing OpenLayers.Map-instance, 
        // a conf object for an OpenLayers.Map or null
        if ( !(this.getMap() instanceof OpenLayers.Map) ) {
            var mapConf = Ext.applyIf(this.getMap() || {}, {
                allOverlays: true,
                controls: this.initialConfig.controls || this.getDefaultControls(),
                numZoomLevels: 24
            });
            this.setMap(new OpenLayers.Map(mapConf));
            this.olMapAutocreated = true;
        } else {
            // add any additionally configured controls:
            if (this.initialConfig.controls) {
                this.getMap().addControls(this.initialConfig.controls);
            }
        }
        
        // check property layers
        if ( this.config.layers ) {
            var layers = this.config.layers;
            
            if(this.config.layers instanceof GXM.data.LayerStore) {
                var arr = [];
                this.config.layers.each(function(rec){
                    arr.push(rec.getLayer());
                });
                layers = arr;
            }
            
            this.getMap().addLayers(layers);
        }
        
        this.layers = Ext.create('GXM.data.LayerStore', {
            data: this.getMap().layers
        });
        
        // check config-property center
        if ( Ext.isString(this.getMapCenter()) ) {
            this.setMapCenter(OpenLayers.LonLat.fromString(this.getMapCenter()));
        } else if(Ext.isArray(this.getMapCenter())) {
            this.setMapCenter(OpenLayers.LonLat.fromArray(this.getMapCenter()));
        } 
        
        // check config-property extent
        if ( Ext.isString(this.getMapExtent()) ) {
            this.setMapExtent(OpenLayers.Bounds.fromString(this.getMapExtent()));
        } else if(Ext.isArray(this.getMapExtent())) {
            this.setMapExtent(OpenLayers.Bounds.fromArray(this.getMapExtent()));
        }
        
        // bind various listeners to the corresponding OpenLayers.Map-events
        this.getMap().events.on({
            "moveend": this.onMoveend,
            "changelayer": this.onChangelayer,
            "addlayer": this.onAddlayer,
            "removelayer": this.onRemovelayer,
            scope: this
        });
        
        this.on({
            painted: 'renderMap',
            scope: this
        });
        window.m= this;
        this.element.on('touchstart', 'onTouchStart', this);
    }