function (x, y) {

    var points = this.values.points;

    if (this.isInROI(x, y)) { 
	    for (var i = 0; i < points.length; i+=1) {
            // TODO check here for a terminal / mid point and do the proper math
	    	if ((x > (points[i][0] - this.handleSize)) && (x < (points[i][0] + this.handleSize))) {
	    		if ((y > (points[i][1] - this.handleSize)) && (y < (points[i][1] + this.handleSize))) {
	    			// We clicked on an handle!
	    			console.log ("Clicked on handle " + i);
	    			this.handleClicked = i;
                                if ((i === 0) || (i === points.length - 1)) {
                                    console.log ("Clicked on a terminal handle!");
                                    return;
                                }
	    		} 
	    	}
	    }
	    // check the selection-start
	    // check if the point is "on" the curve plot
	    // and save a guard (this might be inefficient when t is small and wrong when t is big)
	    for (i = 0; i < this.supportPoints.length; i+=1) {
	    	if ((x > this.supportPoints[i][0] - this.thickness) && (x < this.supportPoints[i][0] + this.thickness)) {
	    		if ((y > this.supportPoints[i][1] - this.thickness) && (y < this.supportPoints[i][1] + this.thickness)) {
	    			//Curve is selected
	    			this.selectStart = true;
	    			return;
	    		}  
	    	} 
	    }
	    
    }
    return undefined;
}