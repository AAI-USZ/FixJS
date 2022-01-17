function(marker) {

	// contains: marker, infoBubble, title, subtitle
	this.clickedMarker = marker;

	// pops the popupmenu
	var near = event.originalEvent && event.originalEvent.target;
    this.controller.popupSubmenu({
		onChoose:  this.handlemarkerBubbleTap,
		placeNear: near,
		items: [
			{iconPath:'images/bubble/info.png',label: $L('Info'), command: 'do-marker-info'},
			{iconPath:'images/street.png', label: $L('Street View'), command: 'do-street'},
			{iconPath:'images/bubble/flagA.png', label: $L('Route from here'), command: 'do-origin'},
			{iconPath:'images/bubble/flagB.png', label: $L('Route to here'), command: 'do-destination'},
			{iconPath:'images/bubble/delete.png', label: $L('Remove'), command: 'do-marker-remove'},
		]
	});


}