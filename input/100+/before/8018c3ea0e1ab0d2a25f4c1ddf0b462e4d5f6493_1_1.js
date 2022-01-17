function(left, top, image, id){
	this.mouseLoc = null;
	this.clicked = false;
	this.mouseOver = false; //detect mouse position over sprite

	this.clickMap = [];
	
	var canvas = document.createElement('canvas');
	canvas.width = this.width();
	canvas.height = this.height();
	var ctx = canvas.getContext('2d');
	ctx.drawImage(this.image, 0, 0);
	var pixels = [];
	try {
		pixels = ctx.getImageData(0, 0, this.width(), this.height()).data;
	} catch (e) {
		console.log('ERROR: ' + this.id + ' failed to load image');
	}
	var col = 0, row = 0;
	
	for (var i = 0; i < pixels.length; i += 4){
		row = Math.floor((i / 4) / this.width());
		col = (i/4)	- (row * this.width());
		if(!this.clickMap[col]) this.clickMap[col] = [];
		this.clickMap[col][row] = pixels[i+3] == 0 ? 0 : 1;
	}
	console.log(this.id + ' has dimensions of (' + col + ', ' + row + ')');
}