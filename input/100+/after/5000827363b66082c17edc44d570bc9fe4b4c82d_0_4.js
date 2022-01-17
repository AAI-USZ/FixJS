function (x, y) {
	this.handleClicked = null;
	// check the selection-end
	// check if the point is "on" the curve plot
	// if the saved guard is true
	// reset the guard and trigger a selected event
	if (this.selectStart === true) {
		for (i = 0; i < this.supportPoints.length; i+=1) {
	    	if ((x > this.supportPoints[i][0] - this.thickness) && (x < this.supportPoints[i][0] + this.thickness)) {
	    		if ((y > this.supportPoints[i][1] - this.thickness) && (y < this.supportPoints[i][1] + this.thickness)) {
	    			//Curve is selected
	    			this.selectStart = false;
	    			var ret = {"slot" : "selected", "value" : [x, y]};
	    			return ret;
	    		}  
	    	} 
	    }
	}
}