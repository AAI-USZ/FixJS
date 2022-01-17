function () {
	/* Horrible and the biggest workaround on the world... don't ask me why I did this for Pre3...
	 * If the map is moved more than pixel device width, the center will be corrected
	 * It is not documented, it is only knowledge based on experiments
	 */
	
	//Mojo.Log.info("** PRE3 REFRESH ***");
	
	//Hack only if the screen is set to high pixel ratio
	if (this.ScreenRoughRatio > 1) {
	//Map moved in dragging function is moved 1.5times more, move to 1/2 of whole move back moves the map to the correct position
	if (this.isdragging ) {
		this.map.panBy((-this.OLDX + this.oldx)/2+500, (-this.OLDY + this.oldy)/2+1000);
		this.map.panBy(-500,-1000);
	} else {
		//pan the map out and back - do the recentering the map projection, this is a TRICK!
		this.map.panBy(500,1000);
		this.map.panBy(-500,-1000);
		};
	};
	
}