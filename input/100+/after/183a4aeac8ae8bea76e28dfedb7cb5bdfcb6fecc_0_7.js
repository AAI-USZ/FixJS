function(args) {
	
	var markerindex = args.markerindex;
	var othermarker;

	try {
	//Set the apropriate icon for marker
	var icon = (markers[markerindex].place.favorite ? 'images/Map-Marker-Push-Pin-2-Right-Red-icon-fav.png' : 'images/Map-Marker-Push-Pin-2-Right-Red-icon.png');
	markers[markerindex].setIcon(icon);

	//create new content of InfoBubble and set them
	var newBubbleContent = '<div id="bubble" class="phoneytext">' + markers[markerindex].place.name + '<div class="phoneytext2">' + markers[markerindex].place.formatted_address + '</div></div>';
	infoBubbles[markerindex].setContent(newBubbleContent);
	} catch (error) {
			//if the refresh fail, place new favorite marker (always if saving nerby as favorite)
			othermarker = this.getMarkerFromID(args.id);
			icon = (othermarker.place.favorite ? 'images/Map-Marker-Push-Pin-2-Right-Red-icon-fav.png' : 'images/Map-Marker-Push-Pin-2-Right-Red-icon.png');
			othermarker.setMap(null);
			for (b=0; b<this.NearbyinfoBubbles.length; b++){
				this.NearbyinfoBubbles[b].close();
			};
			othermarker.place.favorite = true;
			this.PlaceMarker({position: othermarker.place.geometry.location, title: othermarker.place.name, subtitle: othermarker.place.vicinity, place: othermarker.place, icon: 'Map-Marker-Push-Pin-2-Right-Red-icon-fav.png', popbubble: true});
		};	
}