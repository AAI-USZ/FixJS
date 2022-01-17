function () {

	//stop the mousedown listener
	Mojo.Event.stopListening(this.controller.get("map_canvas"), 'mousedown', this.mousedownInterruptsFollowHandler);

	//rotate the map to the default heading
	this.MapHeadingRotate(0); 
	
	this.followMap = false;
	
	//unblock screen timeout
	this.BlockScreenTimeout(false);

	// change the icon as "follow map is active"
	this.feedMenuModel.items[1].items[3].iconPath = 'images/menu-icon-mylocation.png';
	this.controller.modelChanged(this.feedMenuModel);
	

	
	//set default text to the top menu
	this.SetTopMenuText($L("Google Maps"));


}