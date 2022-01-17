function () {
	var mapLoaded = false;
	function geo_success(position) {
	var latAbs = position.coords.latitude * 1000000, lonAbs = position.coords.longitude * 1000000, signlat = 1, signlon = 1;
	var deglat = ((~~(latAbs / 1000000) * signlat) + '° ' + ~~(  ((latAbs/1000000) - ~~(latAbs/1000000)) * 60)  + '\' ' +  ~~( ~~(((((latAbs/1000000) - ~~(latAbs/1000000)) * 60) - ~~(((latAbs/1000000) - ~~(latAbs/1000000)) * 60)) * 100000) *60/100000 ) + '"');
	var deglon = ((~~(lonAbs / 1000000) * signlon) + '° ' + ~~(  ((lonAbs/1000000) - ~~(lonAbs/1000000)) * 60)  + '\' ' +  ~~( ~~(((((lonAbs/1000000) - ~~(lonAbs/1000000)) * 60) - ~~(((lonAbs/1000000) - ~~(lonAbs/1000000)) * 60)) * 100000) *60/100000 ) + '"');
	$("#gps .value").innerHTML = deglat + "<br>" + deglon;
	var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	var myOptions = { zoom: 15, center: latlng, mapTypeControl: false, navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL}, mapTypeId: google.maps.MapTypeId.ROADMAP };
	$("#gps button").onclick = function() {
	
	$("#map").classList.toggle("hidden");
	if ($("#map").classList.contains("hidden")) {
	  $("#gps button").textContent = "Show map »";
	} else {
	  $("#gps button").textContent = "Hide map »";
	}
	if (mapLoaded) return;
	setTimeout(function() {
	  var map = new google.maps.Map($("#map > div"), myOptions);
	  var marker = new google.maps.Marker({ position: latlng, map: map, title:"You are here!" });
	}, 1000);
	}
	}
	navigator.geolocation.getCurrentPosition(geo_success, function(e) {console.log("geo error: " + e)});
        
}