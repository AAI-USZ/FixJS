function (place) {
	
	var subtitle = $L("Approximately: ") + place.formatted_address;
	place.name = $L("Loc: ") + this.inputstring;
	place.icon = "images/menu-icon-mylocation.png";
	place.formatted_address = subtitle;
	place.vicinity = subtitle;
	//place marker
    this.PlaceMarker({position: place.geometry.location, title: this.inputstring, subtitle: subtitle, place: place, action: this.holdaction});
    this.inputstring = undefined;
    this.holdaction = undefined;
}