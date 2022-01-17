function(){
    var loc, map;
    var markers = {};
    var curOverlay = undefined;
    var m;

    function init() {

	loc = new google.maps.LatLng(37.762861, -122.401078);
	var mapOptions = {
            center: loc,
            zoom: 13,
            //mapTypeId: google.maps.MapTypeId.HYBRID
            mapTypeId: google.maps.MapTypeId.ROADMAP
            //mapTypeId: google.maps.MapTypeId.SATELLITE
            //mapTypeId: google.maps.MapTypeId.TERRAIN
	};

	map = new google.maps.Map($("#crazy-map")[0], mapOptions);
	m = new google.maps.Marker({
	    position: loc,
	    map: map,
	    title: "Your Location"
	    //shape: new google.maps.MarkerShape({fillColor:'green'})
	});
    }

    function addLocation(placeData){
	var loc = new google.maps.LatLng(placeData.lat, placeData.lon);
	var loc_off = new google.maps.LatLng(placeData.lat+0.00000, placeData.lon);
	var opts = {
	    position: loc,
	    map: map,
	    title: placeData.name
	};
	var overlay = new google.maps.InfoWindow({
	    content: computeOverlayContent(placeData),
	    position: loc_off
	});
	var marker = new google.maps.Marker(opts);
	google.maps.event.addListener(marker, 'click', function(){openOverlay(overlay)});
	markers[placeData.id] = marker;
    }

    function placeAllMarkers(data){
	clearAllMarkers();
	for(var i in data){
	    MapApplet.addLocation(data[i]);
	}
    }

    // function clearAllMarkers(){
    // 	for(var i in markers){
    // 	    markers[i].setMap(null);
    // 	}
    // 	markers = []; reset it
    // }

    function updateMarkers(newMarkerData){
	console.log("new", newMarkerData);
	console.log("old", markers);
	var oldMarkers = $.extend({}, markers);
	var newMarkers = [];
	for(var i in newMarkerData){
	    var markerData = newMarkerData[i];
	    if(oldMarkers[markerData.id]){
		delete oldMarkers[markerData.id];
	    } else {
		newMarkers.push(markerData);
	    }
	}
	
	// remove old markers
	for(var key in oldMarkers){
            if(oldMarkers.hasOwnProperty(key)){
		removeMarker(key);
	    }
	}

	// add new markers
	for(var i in newMarkers){
	    addLocation(newMarkers[i]);
	}

    }

    function removeMarker(id){
	markers[id].setMap(null);
	delete markers[id];
    }

    function openOverlay(overlay){
	closeOverlays();
	overlay.open(map);
	curOverlay = overlay;
    }

    function closeOverlays(){
	if(curOverlay)
	    curOverlay.close();
	curOverlay = undefined;
    }

    function computeOverlayContent(placeData){
	var s = '<div class="overlay">';
	s += '<div id="overlay-title">'+placeData.name+'</div>';
	s += '<div id="overlay-user">User: '+placeData.user+'</div>';
	s += '<div id="overlay-fee">Delivery Fee: $'+placeData.fee+'</div>';
	s += '<a style="cursor: pointer" onClick="javascript:order_up('+placeData.id+')">Order Up</a></td>';
	//s += '<a href="requests/new?id='+placeData.id+'">Order Up</a>';
	s += '</div>';
	return s;
    }

    return {
	init: init,
	addLocation: addLocation,
	updateMarkers: updateMarkers
    };
}