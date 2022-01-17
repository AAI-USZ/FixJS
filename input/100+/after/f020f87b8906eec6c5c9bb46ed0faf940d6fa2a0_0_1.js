function WallHandler(pts, handlers, handles){

	this.pts = pts;

	this.handles = handles;

	this.gridDim=20;

	if(this.handles.length!=this.pts.length){

		console.log('NAME YOUR WALLS');

	}

	

	this.wallUVs = [];

	this.wallPerpUVs = [];

	this.wallGrids = [];

	this.handlers = {};

	if(handlers){

		this.doInitHandlers(handlers);

	}

	this.xSpan = Math.floor(myCanvas.width/this.gridDim);

	this.ySpan = Math.floor(myCanvas.height/this.gridDim);

	this.numCols = Math.ceil(myCanvas.width/this.gridDim);

	this.numRows = Math.ceil(myCanvas.height/this.gridDim);

}