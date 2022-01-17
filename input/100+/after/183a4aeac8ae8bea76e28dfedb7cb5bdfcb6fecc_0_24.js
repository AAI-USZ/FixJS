function (markertoremove) {
	
	//hide them on map
	markertoremove.marker.setMap(null);
	markertoremove.infoBubble.setMap(null);
	
	//remove from array
	for (e=0; e<markers.length; e++){
		if (markertoremove.marker.place.id == markers[e].place.id) {
					//Mojo.Log.info("Removing marker from array: ", e);
					markers.remove(e);	
				};
	};

	for (e=0; e<infoBubbles.length; e++){
			if (markertoremove.marker.place.id == infoBubbles[e].id) {
					//Mojo.Log.info("Removing infoBubble from array: ", e);
					infoBubbles.remove(e);	
				};
	};
	
	//remove from favorites
	if (markertoremove.marker.place.favorite) {
		for (var i = 0; i < Favorites.length; i++) {
			if (markertoremove.marker.place.id == Favorites[i].id) {
					//Mojo.Log.info("Removing marker from favorites: ", i);
					Favorites.remove(i);
					this.addToFavorites(Favorites);				
				};
			};
	};
}