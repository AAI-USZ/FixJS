function(id, zIndex) {
	this.id = id
	this.spriteArray = [];
	this.fadeOut = false;
	this.fadeIn = false;
	this.timeIn;
	this.drawState = 'new'; // new/updated/removed/unchanged
	this.activeScreen = false;
	
	this.css = {
		// 'position': 'inherit',
		'opacity': 0.0,
		'z-index': zIndex,
	}
	
	//set opacity based on whether or not this screen is on the top zIndex
	if (this.css['z-index'] == g.topZIndex) {
		this.css['opacity'] = 1.0;
	}
	
	this.transitionFrames = 0;
	this.transitionFramesCount = 0;
	

	
}