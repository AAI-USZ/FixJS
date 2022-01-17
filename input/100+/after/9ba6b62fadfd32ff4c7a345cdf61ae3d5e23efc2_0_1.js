function(source){
	var imageData = this.ctx.createImageData(this.width, this.height);

	// Define some variables outside of the loop
	var delta = { x: 0, y: 0 };
	var pos = 0;
	var i = 0;
	var r2 = 0;

	// Loop over x and y. Store 1-D pixel index as i.
	for (var row = 0 ; row < this.height ; row++){
		for (var col = 0 ; col < this.width ; col++){

			delta.x = col - source.x - this.alpha[i].x;
			delta.y = row - source.y - this.alpha[i].y;

			r2 = ( delta.x*delta.x + delta.y*delta.y );
			this.predictedimage[i] = 255*Math.exp(-r2/8);

			// Add to red channel
			imageData.data[pos+0] = 255;
			// Add to green channel
			imageData.data[pos+1] = 255;
			// Add to blue channel
			imageData.data[pos+2] = 255;

			// Alpha channel
			imageData.data[pos+3] = this.predictedimage[i];

			i++;
			pos += 4;
		}
	}

	imageData = this.blur(imageData);

	// Because of the way putImageData replaces all the pixel values, 
	// we have to create a temporary canvas and put it there.
	var overlayCanvas = document.createElement("canvas");
	overlayCanvas.width = this.width;
	overlayCanvas.height = this.height;
	overlayCanvas.getContext("2d").putImageData(imageData, 0, 0);

	// Now we can combine the new image with our existing canvas
	// whilst preserving transparency
	this.ctx.drawImage(overlayCanvas, 0, 0);
}