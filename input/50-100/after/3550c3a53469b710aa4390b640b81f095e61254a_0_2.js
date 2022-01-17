function(){
	$.ajax(OSMHell.API_URL, {
		data: {'action':'centroid', 'get' : 'house', 'city' : this.selectedCity, 'street' : this.selectedStreet, 'house' : this.selectedBuilding},
		context : window.osmhell
	}).done(this.loadBuildingCenterCallback);
}