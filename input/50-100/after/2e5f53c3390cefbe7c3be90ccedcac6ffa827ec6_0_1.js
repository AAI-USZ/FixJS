function(tilejson) {
            tilejson.attribution += mapBoxAdditAttribution;
            var tileLayer = new wax.leaf.connector(tilejson);
            
            layersControl.addBaseLayer(tileLayer, mapData.label);
            if(addToMap) {
                map.addLayer(tileLayer);
                // and radio box for this layer (last = just added)
                $('input[name=leaflet-base-layers]:last').attr('checked',true); 
            }
        }