function() {
	
	this.setStatusPanel($L("Loading StreetView..."));
	this.WebOS2Events("stop");
	var position = this.map.getCenter();
	this.controller.stageController.pushScene({'name': 'street', transition: Mojo.Transition.none}, position);

}