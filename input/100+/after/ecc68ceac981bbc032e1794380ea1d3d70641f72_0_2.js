function (ctx, parameters) {
	
	var points = this.values.points;
	
    ctx.save();
    //paint lines           
    ctx.strokeStyle = this.helperColor;
    ctx.beginPath();
    ctx.moveTo(points[0][0], points[0][1]);
    for(var i = 1; i < points.length; i++){
        ctx.lineTo(points[i][0], points[i][1]);
    }
    ctx.stroke();
            
    //control points
    for(var i = 0; i < points.length; i++) {
    	
    	// See if the point being painted is a terminal one
    	var terminal = false;
    	if ((i === 0) || (i === (points.length - 1))) {
    		terminal = true;
    	}
    	
    	// Paint the handle and labels only according to paintTerminalPoints strategy
    	var pTT = this.paintTerminalPoints;
    	if (terminal === true) {
			if ((pTT === 'all') || ((pTT === 'first') && (i === 0)) || ((pTT === 'last') && (i === (points.length - 1)))) {
	        	this.paintHandle(ctx, points[i], terminal);
	        	// Paint the curve labels
		        if (this.curveLabels) {
		        	ctx.fillText(this.ID + " (" + i  + ")" + " [" + points[i][0] + ',' + points[i][1] + ']', points[i][0], points[i][1] - 10);
		        }
	        }
	    }
    
	    else {
	    	// Paint the midpoints
	    	this.paintHandle(ctx, points[i], terminal);
	    	// Paint the curve labels
			if (this.curveLabels) {
				ctx.fillText(this.ID + " (" + i  + ")" + " [" + points[i][0] + ',' + points[i][1] + ']', points[i][0], points[i][1] - 10);
			}
	    }           
    ctx.restore();
	}
}