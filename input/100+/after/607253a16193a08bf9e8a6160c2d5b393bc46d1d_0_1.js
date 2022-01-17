function setLiveMap(lati, long, data){
	var eventLat = lati; 
	var eventLong = long;
	var filtered_data = filter(data, long, lati);
	
	if(isLive){
		map.removeLayer(markerHere);
	}
	
	if(isLive == false){
		map.setView(new L.LatLng(lati,long), 16);
	}

	
	var MyIcon = L.Icon.extend({
    	iconUrl : 'images/marker.png',
        iconSize : new L.Point(25, 41),
        shadowSize : null,
        iconAnchor : new L.Point(16, 35)})
		
	var MyEvents = L.Icon.extend({
    	iconUrl : 'images/marker_event.png',
        iconSize : new L.Point(25, 41),
        shadowSize : null,
        iconAnchor : new L.Point(16, 35)})
        
    markerHere = new L.Marker(new L.LatLng(eventLat, eventLong));
	var group = new L.LayerGroup();
    markerHere.setIcon(new MyIcon);
		// WHAT IN THE POPUP
	var string = "<h1>U bent hier!</h1>";
	markerHere.bindPopup(string);
   	map.addLayer(markerHere);
	
	if(isLive == false){
		$.each(filtered_data, function(index, value){
	
			var marker = new L.Marker(new L.LatLng(value.latitude, value.longitude));
			marker.setIcon(new MyEvents);
			// WHAT IN THE POPUP
			var string = "<h1>" + value.Begin + " - " + value.Einde + "</h1><p>"+"<img src='images/map_icon.png' class='map_icon'><div id='locatie'><p>" + value.Plaats +"</p><p>"+ value.Straat + " " + value.Huisnr +"</p></div></div><p class='omschrijving'>" + value.Omschrijving + "</p>";
			marker.bindPopup(string);
			group.addLayer(marker);
		});
	
		map.addLayer(group);
	}
	
	isLive = true;
}