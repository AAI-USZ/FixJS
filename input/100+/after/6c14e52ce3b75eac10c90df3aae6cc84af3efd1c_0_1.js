function(div_id, controls){
    if (!div_id) {
        div_id = "map";
    };
    if (!controls) {
        tm.map = new OpenLayers.Map(div_id, {
            maxExtent: new OpenLayers.Bounds(-20037508.34, -20037508.34, 20037508.34, 20037508.34),
            //restrictedExtent: new OpenLayers.Bounds(-13049000,3852890,-13037000,3862000),
            units: 'm',
            projection: new OpenLayers.Projection("EPSG:4326"),
            displayProjection: new OpenLayers.Projection("EPSG:4326"),
            controls: [new OpenLayers.Control.Attribution(),
                       new OpenLayers.Control.Navigation(),
                       new OpenLayers.Control.ArgParser(),
                       new OpenLayers.Control.PanPanel(),
                       new OpenLayers.Control.ZoomPanel()]
        });
    }
    else {
        tm.map = new OpenLayers.Map(div_id, {
            maxExtent: new OpenLayers.Bounds(-20037508.34, -20037508.34, 20037508.34, 20037508.34),
            //restrictedExtent: new OpenLayers.Bounds(-13049000,3852890,-13037000,3862000),
            units: 'm',
            projection: new OpenLayers.Projection("EPSG:4326"),
            displayProjection: new OpenLayers.Projection("EPSG:4326"),
            controls: controls
        });

    }
    

   tm.baseLayer = new OpenLayers.Layer.Google("Google Streets", {
        sphericalMercator: true,
        numZoomLevels: 21
    });
  
    tm.aerial = new OpenLayers.Layer.Google("Hybrid", {
        type: google.maps.MapTypeId.HYBRID,            
        sphericalMercator: true,
        numZoomLevels: 21
    });
    
    tm.tms = new OpenLayers.Layer.TMS('TreeLayer', 
        tm_urls.tc_url,
        {
            layername: 'SanDiego',
            type: 'png',
            isBaseLayer: false,
            wrapDateLine: true,
            attribution: "(c) UrbanForestMap.org"
        }
    );
    tm.tms.buffer = 0;


    tm.baseLayer.buffer = 0;
    tm.aerial.buffer = 0;
    tm.map.addLayers([tm.baseLayer, tm.aerial, tm.tms]);
    tm.map.setBaseLayer(tm.baseLayer);
    tm.baseLayer.mapObject.setTilt(0);
    tm.aerial.mapObject.setTilt(0);
    $('.olLayerGoogleV3.gmnoprint').hide()
}