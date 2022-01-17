function init_osm_box(divName) {
    var map = new OpenLayers.Map (divName, {
        controls:[
            new OpenLayers.Control.Navigation(),
            new OpenLayers.Control.LayerSwitcher()
            ],
        maxExtent: new OpenLayers.Bounds(-20037508.34,-20037508.34,20037508.34,20037508.34),
        maxResolution: 156543.0399,
        numZoomLevels: 19,
        units: 'm',
        projection: new OpenLayers.Projection("EPSG:900913"),
        displayProjection: new OpenLayers.Projection("EPSG:4326")
    } );
    
    map.addLayers([
        new OpenLayers.Layer.OSM.Mapnik("OpenStreetMap"),
        /*new OpenLayers.Layer.Google( "Google Streets", {'sphericalMercator': true, numZoomLevels:18, displayInLayerSwitcher: true} ),
        new OpenLayers.Layer.Google( "Google MapMaker", {type: G_MAPMAKER_NORMAL_MAP, 'sphericalMercator': true,  numZoomLevels:18} ),
        new OpenLayers.Layer.Google( "Google Aerial", {type: G_SATELLITE_MAP, 'sphericalMercator': true, numZoomLevels:19} ),
        new OpenLayers.Layer.Google( "Google Physical", {type: G_PHYSICAL_MAP, 'sphericalMercator': true, numZoomLevels:16} ),*/

        new OpenLayers.Layer.OSM( "OSM Cycle Map", "http://tile.opencyclemap.org/cycle/${z}/${x}/${y}.png",
        { displayOutsideMaxExtent: true, 
            opacity: 0.5, isBaseLayer: false, visibility: false, numZoomLevels:17, permalink: "cycle" } ),

        new OpenLayers.Layer.OSM( "Hillshading", "http://toolserver.org/~cmarqu/hill/${z}/${x}/${y}.png",
        { displayOutsideMaxExtent: true, 
            opacity: 1, isBaseLayer: false, visibility: false, numZoomLevels:17, transparent: true, noOpaq: true, permalink: "hill" } ),

        new OpenLayers.Layer.OSM( "Hiking Map", "http://tile.lonvia.de/hiking/${z}/${x}/${y}.png",
        { displayOutsideMaxExtent: true, 
            opacity: 1, isBaseLayer: false, visibility: false, numZoomLevels:19, transitionEffect: "null", noOpaq: true, permalink: "hiking" } ),
    ]);
    add_geoportail_layer(map)
    map.addControl(new OpenLayers.Control.LayerSwitcher());

    map.setCenter(transformLonLat(new OpenLayers.LonLat(mapCenter.lon, mapCenter.lat)), mapCenter.zoom);

    map.div.style[OpenLayers.String.camelize('background-image')]= 'none';
    
    return map
}