function init_map() {
    map = new OpenLayers.Map({
        div: "map",
        projection: "EPSG:900913",
        displayProjection: "EPSG:4326",
        numZoomLevels: 18
    });
    map.addControl(new OpenLayers.Control.LayerSwitcher({
        'div': OpenLayers.Util.getElement('layerswitcher')
    }));

    var osm = new OpenLayers.Layer.OSM();

    var terrain = new OpenLayers.Layer.OSM("Terrain", 
        "http://tile.stamen.com/terrain/${z}/${x}/${y}.jpg",
        {'attribution': '<a id="home-link" target="_top" href="../">Map tiles</a> by <a target="_top" href="http://stamen.com">Stamen Design</a>, under <a target="_top" href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a target="_top" href="http://openstreetmap.org">OpenStreetMap</a>, under <a target="_top" href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'}
    );
 
    var esri_physical = new OpenLayers.Layer.XYZ( "ESRI World Physical Map",
        "http://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/${z}/${y}/${x}",
        {sphericalMercator: true} 
    );

    var esri_shade = new OpenLayers.Layer.XYZ( "ESRI Shaded Relief Map",
        "http://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/${z}/${y}/${x}",
        {sphericalMercator: true} 
    );

    var google_terrain = new OpenLayers.Layer.Google(
        "Google Terrain",
        {type: google.maps.MapTypeId.TERRAIN, opacity: 0.6}
    );

    var myStyles = new OpenLayers.StyleMap({
        "default": new OpenLayers.Style({
            fillColor: "#ffffff",
            fillOpacity: 0.4,
            strokeColor: "#003300",
            strokeWidth: 0.3,
            graphicZIndex: 1
        }),
        "select": new OpenLayers.Style({
            fillColor: "#ffff00",
            fillOpacity: 0.6,
            graphicZIndex: 2
        })
    });

    // allow testing of specific renderers via "?renderer=Canvas", etc
    var renderer = OpenLayers.Util.getParameters(window.location.href).renderer;
    renderer = (renderer) ? [renderer] : OpenLayers.Layer.Vector.prototype.renderers;
    pu_layer = new OpenLayers.Layer.Vector("Planning Units", {
        styleMap: myStyles,
        renderers: renderer
    });

    pu_layer.events.on({
        'featureselected': function(feature) {
            update_counter(this);
        },
        'featureunselected': function(feature) {
            update_counter(this);
        }
    });

    var url = "/seak/planning_units.geojson";

    OpenLayers.loadURL(url, {}, null, function (response) {
        var gformat = new OpenLayers.Format.GeoJSON();
        var feats = gformat.read(response.responseText);
        pu_layer.addFeatures(feats);
    });

    map.addLayers([esri_shade, esri_physical, osm, google_terrain, terrain, pu_layer]);
    
    var highlight_style = { fillColor:'#FFFF00', strokeColor:'#CCCC33', fillOpacity:0.7 };
    hilites = new OpenLayers.Layer.Vector("Highlighted", {isBaseLayer:false, features:[], visibility:true, style:highlight_style}
    );
    map.addLayer(hilites);

    drawControls = {
        select: new OpenLayers.Control.SelectFeature(
            pu_layer,
            {
                clickout: true, 
                toggle: false,
                multiple: true, 
                hover: false,
                toggleKey: "ctrlKey", // ctrl key removes from selection
                multipleKey: "shiftKey", // shift key adds to selection
                box: true
            }
        )
    };
    
    for(var key in drawControls) {
        map.addControl(drawControls[key]);
    }
    map.setCenter(new OpenLayers.LonLat(-13600000, 6700000), 4);
}