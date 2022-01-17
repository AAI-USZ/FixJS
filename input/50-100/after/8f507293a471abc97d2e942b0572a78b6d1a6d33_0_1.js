function retrievePolygon(){

	if(typeof(Storage) !== "undefined"){
		var encodedPath = localStorage.polygon;
		var decodedPath = google.maps.geometry.encoding.decodePath(encodedPath);
		return new google.maps.MVCArray(decodedPath);
	}
}