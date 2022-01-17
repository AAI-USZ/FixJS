function savePolygon(path){
	if(typeof(Storage) !== "undefined"){
		console.log("Setting poly in localstorage");

		var encodedPath = google.maps.geometry.encoding.encodePath(path);

		localStorage.polygon = encodedPath;
	}
}