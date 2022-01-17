function savePolygon(path){
	if(typeof(Storage) !== "undefined"){
		var encodedPath = google.maps.geometry.encoding.encodePath(path);
		localStorage.polygon = encodedPath;
	}
}