function(n) {
	var markerLatLng = new google.maps.LatLng(n.c.x, n.c.y);

	var marker = new google.maps.Marker({
		position : markerLatLng,
		map : this.map,
		title : "Sensor: " + n.id
	});

	this.infoWindow.setContent("<h2>Sensor: " + n.id + "</h2><p>" + n.desc + "</p>");

	var self = this;
	google.maps.event.addListener(marker, 'click', function() {
		self.infoWindow.open(self.map, marker);
	});

	this.markersArray.push(marker);
}