function(layer) {
    if (!layer.layer) {
        var opts = {
            displayInLayerSwitcher: false
        };
        if (layer.utfurl) {
            layer.utfgrid = new OpenLayers.Layer.UTFGrid({

                url: layer.utfurl,
                                 
                utfgridResolution: 4, // default is 2
                displayInLayerSwitcher: false,
                useJSONP: false
            });
            //layer.utfgrid.projection = new OpenLayers.Projection("EPSG:4326");  
            app.map.addLayer(layer.utfgrid); 
            
            layer.utfcontrol = new OpenLayers.Control.UTFGrid({
                layers: [layer.utfgrid],
                handlerMode: 'click',
                callback: function(infoLookup) {
                    console.dir(infoLookup);
                    //document.getElementById("info").innerHTML = msg;
                }
            });

            app.map.addControl(layer.utfcontrol); 
            	
            layer.layer = new OpenLayers.Layer.XYZ(layer.name, 
                //layer.type === 'XYZ' ? layer.url : layer.url + '.png', 
                layer.url,
                $.extend({}, opts, 
                    {
                        sphericalMercator: true
                    }
                )
            );            
            
        } else if (layer.type == 'Vector') {
            layer.layer = new OpenLayers.Layer.Vector(
                layer.name,
                {
                    projection: new OpenLayers.Projection('EPSG:3857'),
                    strategies: [new OpenLayers.Strategy.Fixed()],
                    protocol: new OpenLayers.Protocol.HTTP({
                        url: layer.url,
                        format: new OpenLayers.Format.GeoJSON()
                    })
                }
            );
        } else { //if XYZ with no utfgrid
            // adding layer to the map for the first time		
            layer.layer = new OpenLayers.Layer.XYZ(layer.name, 
                //layer.type === 'XYZ' ? layer.url : layer.url + '.png', 
                layer.url,
                $.extend({}, opts, 
                    {
                        sphericalMercator: true
                    }
                )
            );
        }
        //layer.layer.projection = new OpenLayers.Projection("EPSG:3857");
        app.map.addLayer(layer.layer);            
    }
    layer.layer.opacity = .5
    layer.layer.setVisibility(true);
}