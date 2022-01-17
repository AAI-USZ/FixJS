function(imageData){
	//return this.convolve(imageData, this.kernel);

	var steps = 1;
	var smallW = Math.round(this.width / this.scale);
	var smallH = Math.round(this.height / this.scale);

	var canvas = document.createElement("canvas");
	canvas.width = this.width;
	canvas.height = this.height;
	var ctx = canvas.getContext("2d");
	console.log(ctx,imageData,this.width,this.height)
	ctx.putImageData(imageData,0,0);

	var copy = document.createElement("canvas");
	copy.width = smallW;
	copy.height = smallH;
	var copyCtx = copy.getContext("2d");

	for (var i=0;i<steps;i++) {
		var scaledW = Math.max(1,Math.round(smallW - i));
		var scaledH = Math.max(1,Math.round(smallH - i));

		copyCtx.clearRect(0,0,smallW,smallH);
		copyCtx.drawImage(canvas,0,0,this.width,this.height,0,0,scaledW,scaledH);
		ctx.drawImage(copy,0,0,scaledW,scaledH,0,0,this.width,this.height);
	}

	return ctx.getImageData(0,0,this.width,this.height);

}