function init_map() {
    map = new OpenLayers.Map({
        div: "map",
        projection: "EPSG:900913",
        displayProjection: "EPSG:4326",
        controls: [
            new OpenLayers.Control.Navigation(),
            new OpenLayers.Control.Zoom(),
            new OpenLayers.Control.KeyboardDefaults(),
            new OpenLayers.Control.LayerSwitcher({
                'div': OpenLayers.Util.getElement('layerswitcher')
            })
        ],
        numZoomLevels: 18
    });

    markers = new OpenLayers.Layer.Markers( "Markers" );
    //var lonLat = new OpenLayers.LonLat( -14277165.0, 7002116.0 );
    //markers.addMarker(new OpenLayers.Marker(lonLat));

    var osm = new OpenLayers.Layer.OSM();

    var esri_physical = new OpenLayers.Layer.XYZ( "ESRI World Physical Map",
        "http://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/${z}/${y}/${x}",
        {sphericalMercator: true} 
    );

    var esri_shade = new OpenLayers.Layer.XYZ( "ESRI Shaded Relief Map",
        "http://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/${z}/${y}/${x}",
        {sphericalMercator: true} 
    );

    var esri_topo = new OpenLayers.Layer.XYZ( "ESRI World Topo Map",
        "http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/${z}/${y}/${x}",
        {sphericalMercator: true} 
    );

    var nplcc = new OpenLayers.Layer.OSM( "North Pacific LCC",
        "/media/tiles/nplcc/${z}/${x}/${y}.png",
        {
         sphericalMercator: true,
         isBaseLayer: false,
         visibility: false
        } 
    );

    var pu_utfgrid = new OpenLayers.Layer.UTFGrid({
         url: "/media/tiles/planning_units/${z}/${x}/${y}.json",
         utfgridResolution: 4,
         sphericalMercator: true,
         displayInLayerSwitcher: false
        } 
    );

    var pu_tiles = new OpenLayers.Layer.OSM( "Planning Units",
        "/media/tiles/planning_units/${z}/${x}/${y}.png",
        {
         sphericalMercator: true,
         isBaseLayer: false
        } 
    );

    var google_terrain = new OpenLayers.Layer.Google(
        "Google Terrain",
        {type: google.maps.MapTypeId.TERRAIN, opacity: 0.6}
    );

    var myStyles = new OpenLayers.StyleMap({
        "default": new OpenLayers.Style({
            display: "none",  /* needs to be set temporarily to true for selection to work */
            strokeWidth: 0,
            fillOpacity: 0
        }),
        "select": new OpenLayers.Style({
            display: true,
            strokeWidth: 0,
            fillColor: "#ffff00",
            fillOpacity: 0.5,
            graphicZIndex: 2
        }),
        "select_geography": new OpenLayers.Style({
            display: true,
            fillColor: "#777777",
            fillOpacity: 0.5
        })
    });

    // allow testing of specific renderers via "?renderer=Canvas", etc
    var renderer = OpenLayers.Util.getParameters(window.location.href).renderer;
    renderer = (renderer) ? [renderer] : OpenLayers.Layer.Vector.prototype.renderers;
    pu_layer = new OpenLayers.Layer.Vector("Planning Units", {
        styleMap: myStyles,
        renderers: renderer,
        displayInLayerSwitcher: false
    });

    var url = "/seak/planning_units.geojson";

    var jqxhr = $.get(url, function(data) {
        var gformat = new OpenLayers.Format.GeoJSON();
        try {
            var feats = gformat.read(data); 
            pu_layer.addFeatures(feats);
        } catch(err) {
            console.log(err.message);
            app.scenarios.viewModel.planningUnitsLoadError(true);
        }
    }, 'json')
    .error(function() { app.scenarios.viewModel.planningUnitsLoadError(true); })
    .complete(function() { app.scenarios.viewModel.planningUnitsLoadComplete(true); });

    map.addLayers([esri_shade, esri_topo, esri_physical, osm, google_terrain, pu_layer, pu_tiles, pu_utfgrid, nplcc, markers]);
    
    selectFeatureControl = new OpenLayers.Control.SelectFeature(
        pu_layer,
        {
            multiple: true
        }
    );

    var geographySelectCallback = function(){ 
        $('#geographySelectionCount').html(pu_layer.selectedFeatures.length);
    };

    selectGeographyControl = new OpenLayers.Control.SelectFeature(
        pu_layer,
        {
            clickout: true, 
            toggle: false,
            multiple: true, 
            hover: false,
            toggleKey: "ctrlKey", // ctrl key removes from selection
            multipleKey: "shiftKey", // shift key adds to selection
            renderIntent: "select_geography",
            box: true,
            onSelect: geographySelectCallback,
            onUnselect: geographySelectCallback
        }
    );

    selectFeatureControl.deactivate();
    selectGeographyControl.deactivate();

    map.addControls([selectFeatureControl, selectGeographyControl]);

    var callback = function(infoLookup) {
        var msg = ""; 
        if (infoLookup) {
            var info;
            for (var idx in infoLookup) {
                info = infoLookup[idx];
                if (info && info.data) {
                    msg = "<table>";
                    $.each(info.data, function(idx, val) {
                        msg += "<tr><th>"+ idx + "</th><td>" + val + "</td></tr>";
                    });
                    msg += "</table>";
                }
            }
        }
        document.getElementById("info").innerHTML = msg;
    };

    var ctl = new OpenLayers.Control.UTFGrid({
        callback: callback,
        handlerMode: "move"
    });

    map.addControl(ctl);

    map.setCenter(new OpenLayers.LonLat(-13600000, 6700000), 4);
}