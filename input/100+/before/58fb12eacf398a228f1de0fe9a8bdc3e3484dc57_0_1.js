function initMap(tileurl, ismobile) {
    $('#map').text('');

    mapcontrols = [ new Osgende.RouteMapPermalink(),
                    new OpenLayers.Control.ScaleLine({geodesic: true})
                  ]
    if (ismobile) {
        mapcontrols = mapcontrols.concat( [
                       new OpenLayers.Control.TouchNavigation({
                                dragPanOptions: { enableKinetic: true }
                           }),
                       new OpenLayers.Control.Zoom()
                      ]);
    } else {
        mapcontrols = mapcontrols.concat(
                     [ new OpenLayers.Control.Navigation(),
                       new OpenLayers.Control.PanZoomBar({panIcons: false}),
                       new Osgende.RouteMapMousePosition(),
                       new OpenLayers.Control.KeyboardDefaults()]);
    }

    map = new OpenLayers.Map ("map", {
            controls: mapcontrols,
            maxExtent: new OpenLayers.Bounds(-20037508.34,-20037508.34,     20037508.34,20037508.34),
            maxResolution: 156543.0399,
            numZoomLevels: 19,
            units: 'm',
            projection: new OpenLayers.Projection("EPSG:900913"),
            displayProjection: new OpenLayers.Projection("EPSG:4326")
    });


    /** Original Mapnik map */
    var layerMapnik = new OpenLayers.Layer.OSM("Mapnik",
                           [  "http://a.tile.openstreetmap.org/${z}/${x}/${y}.png",
                              "http://b.tile.openstreetmap.org/${z}/${x}/${y}.png",
                              "http://c.tile.openstreetmap.org/${z}/${x}/${y}.png"
                           ],
                           { opacity: baseopacity,
                             numZoomLevels: 19,
                             "permalink" : "base"});

    var layerHiking = new OpenLayers.Layer.OSM("Routes Map",
                           tileurl + "/${z}/${x}/${y}.png",
                           { numZoomLevels: 19,
                             isBaseLayer: false,
                             transitionEffect: "null",
                             opacity: routeopacity,
                             tileOptions : {crossOriginKeyword: null},
                             "permalink": "route"
                           });


    var hill = new OpenLayers.Layer.OSM(
        "Hillshading (NASA SRTM3 v2)",
        "http://toolserver.org/~cmarqu/hill/${z}/${x}/${y}.png",
        {  displayOutsideMaxExtent: true, isBaseLayer: false,
                             tileOptions : {crossOriginKeyword: null},
transparent: true, "visibility": (hillopacity > 0.0), "permalink" : "hill"
        }
        );
    if (hillopacity > 0.0) {
        if (hillopacity > 1.0)
           hill.setOpacity(1.0);
        else
           hill.setOpacity(hillopacity);
    }

    var hill2 = new OpenLayers.Layer.OSM(
        "Hillshading (exaggerate)",
        "http://toolserver.org/~cmarqu/hill/${z}/${x}/${y}.png",
        { displayOutsideMaxExtent: true, isBaseLayer: false,
                             tileOptions : {crossOriginKeyword: null},
transparent: true, "visibility": (hillopacity > 1.0), "permalink" : "hill"
        }
        );
    if (hillopacity > 1.0)
        hill2.setOpacity(hillopacity - 1.0);


    map.addLayers([hill, hill2, layerMapnik, layerHiking]);

    if (window.location.href.indexOf("?") == -1) {
        var bounds = new OpenLayers.Bounds(minlon, minlat, maxlon, maxlat);
        map.zoomToExtent(bounds);
    }

    map.events.register("moveend", map, updateLocation);
    map.events.register("changelayer", map, updateLocation);

    //XXX this should go somewhere else
    setupRouteView(map);
}