function initialize() {
    // Make a new Leaflet map in your container div
    map = new L.Map(mapId).setView(centerLatLng, defaultZoom);

    map.on('layeradd', function(layerEvent){
        if(layerEvent.layer == hexbinLayerGroup)
        {
            hexbinLayerAdded(layerEvent.layer);
        }
        else if(layerEvent.layer == markerLayerGroup)
        {
            markerLayerAdded(layerEvent.layer);
        }
    });

    map.on('layerremove', function(layerEvent){
        if(layerEvent.layer == hexbinLayerGroup)
        {
            hexbinLayerRemoved(layerEvent.layer);
        }
        else if(layerEvent.layer == markerLayerGroup)
        {
            markerLayerRemoved(layerEvent.layer);
        }
    });

    var overlays = {};
    overlays[markerLayerLabel] = markerLayerGroup;
    overlays[hexbinLayerLabel] = hexbinLayerGroup;
    layersControl = new L.Control.Layers({}, overlays);
    map.addControl(layersControl);
    map.addLayer(markerLayerGroup); //show marker layer by default

    // add bing maps layer
    $.each(bingMapTypeLabels, function(type, label) {
        var bingLayer = new L.TileLayer.Bing(bingAPIKey, type); 
        layersControl.addBaseLayer(bingLayer, label);
    });

    // Get metadata about the map from MapBox
    var tileJSONAddFn = function(mapData, addToMap) { 
        var innerFn = function(tilejson) {
            tilejson.attribution += mapBoxAdditAttribution;
            var tileLayer = new wax.leaf.connector(tilejson);
            
            layersControl.addBaseLayer(tileLayer, mapData.label);
            if(addToMap) {
                map.addLayer(tileLayer);
                // and radio box for this layer (last = just added)
                $('input[name=leaflet-base-layers]:last').attr('checked',true); 
            }
        };
        return innerFn;
    }; 
    if (customMapBoxTileLayer) {
        mapboxMaps = _.union([customMapBoxTileLayer], mapboxMaps);
    }
    _.each(mapboxMaps, function(mapData, idx) {
        wax.tilejson(mapData.url, tileJSONAddFn(mapData, !idx)); //ie, only add idx 0
    });

    // create legend container
    $(leafletControlSelector).append('<div class="legends-container"></div>');
    legendsContainer = $($(leafletControlSelector).children('div.legends-container')[0]);

    // load form structure/questions
    formJSONMngr.loadFormJSON();
}