function () {
    if (this.drawClass !== undefined) {
		       
        // Call the superclass.
        Curve.superclass.refresh.call(this, this.drawClass.drawDummy);
        
        var context = this.drawClass.drawDummy.canvasC;
		
        if (this.isVisible === true) {
        	var initialPoints = this.values.points;
        	var parameters = {
        		thickness: this.thickness,
     			curveColor: this.curveColor,
     			helperColor: this.helperColor,
     			handleColor: this.handleColor,
     			handleSize: this.handleSize,
     			curveLabels: this.curveLabels
        	}
        	
        	this.genericCurve (this.values.points, this.curveType);
        	this.paintCurve (context);
    		this.paintPoints(context, this.values.points, parameters);
        }
    }
}