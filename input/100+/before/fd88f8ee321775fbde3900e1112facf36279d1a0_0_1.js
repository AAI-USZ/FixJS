function (x, y) {

    var points = this.values.points;

    if (this.isInROI(x, y)) { 
	    for (var i = 0; i < points.length; i+=1) {
	    	if ((x > (points[i][0] - this.handleSize)) && (x < (points[i][0] + this.handleSize))) {
	    		if ((y > (points[i][1] - this.handleSize)) && (y < (points[i][1] + this.handleSize))) {
	    			// We clicked on an handle!
	    			console.log ("Clicked on handle " + i);
	    			this.handleClicked = i;
	    		} 
	    	}
	    }
    }
    return undefined;
}