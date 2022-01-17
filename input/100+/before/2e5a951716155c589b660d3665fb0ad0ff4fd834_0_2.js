function(image, dx, dy, dWidth, dHeight) {
		var args = arguments;

		var sx = 0;
		var sy = 0;
		var sWidth = image.width;
		var sHeight = image.height;

		if (arguments.length > 5) {
			sx = args[1];
			sy = args[2];
			sWidth = args[3];
			sHeight = args[4];
			dx = args[5];
			dy = args[6];
			dWidth = args[7];
			dHeight = args[8];
		}

		dx = dx || 0;
		dy = dy || 0;
		dWidth = dWidth || sWidth;
		dHeight = dHeight || sHeight;

		// draw and transform image natively
		var canvas_tmp = document.createElement('canvas');
		canvas_tmp.width = this.imageData.width;
		canvas_tmp.height = this.imageData.height;

		var context_tmp = canvas_tmp.getContext('2d');
		context_tmp.globalAlpha = 1;
		context_tmp.drawImage.apply(context_tmp, args);

		// composite image onto hdr canvas
		var i, x, y, alpha_src, alpha_dest;
		var blend = this.getBlendFunction(this.globalBlendMode);
		var data  = context_tmp.getImageData(0, 0, this.imageData.width, this.imageData.height).data;
		var x_min = Math.floor(dx);
		var y_min = Math.floor(dy);
		var x_max = Math.min(this.imageData.width, Math.ceil(dx + dWidth));
		var y_max = Math.min(this.imageData.height, Math.ceil(dy + dHeight));
		for (y = y_min; y < y_max; y++) {
			for (x = x_min; x < x_max; x++) {
				i = (y * this.imageData.width + x) * 4;

				alpha_dest = this.imageData.data[i + 3] / 255;
				alpha_src  = (data[i + 3] * context.globalAlpha) / 255;

				this.imageData.data[i]     = blend.component(data[i], this.imageData.data[i], alpha_src, alpha_dest);
				this.imageData.data[i + 1] = blend.component(data[i + 1], this.imageData.data[i + 1], alpha_src, alpha_dest);
				this.imageData.data[i + 2] = blend.component(data[i + 2], this.imageData.data[i + 2], alpha_src, alpha_dest);
				this.imageData.data[i + 3] = blend.alpha(alpha_src, alpha_dest) * 255;
			}
		}

		this.render();
	}