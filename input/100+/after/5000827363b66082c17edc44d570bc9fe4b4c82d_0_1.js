function (args) {

    // Call the constructor from the superclass.
    Curve.superclass.getready.call(this, args);

    this.values = {	"points" : [],
    				"selected" : []};
    this.defaultSlot = "points";
    
    this.setWidth(args.width);
    this.setHeight(args.height);
    this.curveType = args.curveType || "bezier";
    this.thickness = args.thickness || 2;
    this.curveColor = args.curveColor || "black";
    this.helperColor = args.helperColor || '#CCCCCC';
    this.handleColor = args.handleColor || "red";
    this.curveLabels = (typeof args.curveLabels === 'boolean') ? args.curveLabels : false;
    this.terminalPointStyle = args.terminalPointStyle || 'rect';
    this.paintTerminalPoints = args.paintTerminalPoints || 'all';
    this.midPointStyle = args.midPointStyle || 'circle';
    this.terminalPointSize = args.terminalPointSize || 16;
    this.midPointSize = args.midPointSize || 8;
    this.terminalPointColor = args.terminalPointColor || this.handleColor;
    this.midPointColor = args.midPointColor || this.handleColor;
    this.terminalPointFill = args.terminalPointFill || null;
    this.midPointFill = args.midPointFill || null;
    // handleSize is the tolerance when dragging handles
    this.handleSize = args.handleSize || (this.terminalPointSize > this.midPointSize) ? this.terminalPointSize : this.midPointSize;
    
    //internals
    this.handleClicked = null;
    this.supportPoints = [];
    this.selectStart = false;
    
    
    // Check for correct number of arguments
    switch (args.curveType)  {
    	case "bezier":
		    if(args.points.length % 2 != 0 || args.points.length < 4) {
		        throw "Incorrect number of points " + args.points.length;
		       }
		    break;
	    case "halfcosine":
	    case "smooth":
	    case "linear":
	    	if(args.points.length !== 4) {
		        throw "Incorrect number of points " + args.points.length;
		       }
		    break;
		/* TODO these aren't working 
		case "cubic":
		case "catmull":
		case "hermite" :
			if(args.points.length !== 8) {
		        throw "Incorrect number of points " + args.points.length;
		       }
		    break; */
		default:
			throw "Unknown curve type " + args.curveType;
    }
                
    //transform initial arguments into an {Array} of [x,y] coordinates
    var initialPoints = [];
    for(var i=0; i < args.points.length; i=i+2){
        initialPoints.push([args.points[i], args.points[i+1]]);
    }
    
    this.values.points = initialPoints;

}