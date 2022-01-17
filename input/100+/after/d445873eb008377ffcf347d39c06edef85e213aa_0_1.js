function LensToy(input){

	// Set some variables
	this.id = (input && typeof input.id=="string") ? input.id : "LensToy";
	this.src = (input && typeof input.src=="string") ? input.src : "";
	this.width = (input && typeof input.width=="number") ? input.width : 100;
	this.height = (input && typeof input.height=="number") ? input.height : 100;
	this.events = {load:"",click:"",mousemove:""};	// Let's define some events


	this.img = { complete: false };
	this.stretch = "linear";
	this.color = "gray";

	this.setup(this.id);

	if(this.src) this.load(this.src);

	this.bind("mousemove",function(e){

		if(!this.alpha) return;

		var imageData = this.ctx.createImageData(this.width, this.height);

		// Define some variables outside of the loop
		var source = { x: e.x, y:e.y };
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
		// Because of the way putImageData replaces all the pixel values, 
		// we have to create a temporary canvas and put it there.
		var overlayCanvas = document.createElement("canvas");
		overlayCanvas.width = this.width;
		overlayCanvas.height = this.height;
		overlayCanvas.getContext("2d").putImageData(imageData, 0, 0);
		// Paste original image
		this.pasteFromClipboard();
		// Now we can combine the new image with our existing canvas
		// whilst preserving transparency
		this.ctx.drawImage(overlayCanvas, 0, 0);

		var r = 5;
		// Add a circle to show where the source is
		this.ctx.beginPath();
		this.ctx.arc(e.x-parseInt(r/2), e.y-parseInt(r/2), r, 0 , 2 * Math.PI, false);
		this.ctx.fillText("Source",e.x+r, e.y+r);
		this.ctx.fillStyle = "#FF9999";
		this.ctx.fill();
		this.ctx.closePath();
	});

}