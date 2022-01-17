function success(position) {
    map = new OpenLayers.Map({
		div: "map",
		theme: null,
		controls: [
			new OpenLayers.Control.Attribution(),
			new OpenLayers.Control.TouchNavigation({
				dragPanOptions: {
					enableKinetic: true
				}
			}),
			new OpenLayers.Control.Zoom()
		],
		layers: [
			new OpenLayers.Layer.OSM("OpenStreetMap", null, {
				transitionEffect: "resize"
			})
		]
	});
	
	var lonlat = new OpenLayers.LonLat(position.coords.longitude, position.coords.latitude).transform(new OpenLayers.Projection("EPSG:4326"),new OpenLayers.Projection("EPSG:900913"));
	map.setCenter(lonlat);
	map.zoomTo(16);
		
	// Create new layer and add layer to the map	
	var markers = new OpenLayers.Layer.Markers("Markers");
	map.addLayer(markers);

	// Adding the markers to the layer
	var size = new OpenLayers.Size(25,25);
	var offset = new OpenLayers.Pixel(-(size.w/2), -(size.h/2));
	var icon = new OpenLayers.Icon('img/my-location.png', size, offset);
	markers.addMarker(new OpenLayers.Marker(lonlat,icon));
	
	$.getJSON('/REST/Building.json?select=buildingID;longitude;latitude', function(data) {
        $.each(data.Building, function(key, val) {
            addMarker(markers, val.longitude, val.latitude, val.buildingID);
        });
    });

    
    /*var url = '/map/transport.php?url=http://www.yournavigation.org/api/1.0/gosmore.php&format=geojson&flat=52.215676&flon=5.963946&tlat=52.2573&tlon=6.1799&v=motorcar&fast=1&layer=mapnik';

    $.get(url, function(data) {
        alert(data.coordinates);
    });*/
}