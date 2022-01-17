function(config) {
		var canvas = document.getElementById("myCanvas"),
			imageHolder = hipstermatic.vars.imgObject,
			canvasWidth = hipstermatic.vars.canvasWidth,
			canvasHeight = hipstermatic.vars.canvasHeight,
			ctx = hipstermatic.vars.canvasContext,
			imgPixels = ctx.getImageData(0, 0, canvasWidth, canvasHeight),
			imgPixelsHeight = imgPixels.height,
			imgPixelsWidth = imgPixels.width;

	
		if (config.brightness || config.channelAdjustment || config.greyscale || config.sepia) {
			for (var y = 0; y < imgPixelsHeight; y++) {
				for (var x = 0; x < imgPixelsWidth; x++) {
					var i = (y * 4) * imgPixelsWidth + x * 4,
					r, g, b;
					if (config.brightness) {
						r = config.brightness,g = config.brightness, b = config.brightness;
						imgPixels = hipstermatic.filter.adjustPixel(imgPixels, i, r, g, b);
					}
					if (config.channelAdjustment) {
						r = config.channelAdjustment.red,g = config.channelAdjustment.green, b = config.channelAdjustment.blue;
						imgPixels = hipstermatic.filter.adjustPixel(imgPixels, i, r, g, b);
						
					}
					
					if (config.greyscale || config.sepia){
						var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
						imgPixels = hipstermatic.filter.setPixel(imgPixels, i, avg, avg, avg);
					}
					
				}
			}

			ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixelsWidth, imgPixelsHeight); // add only one placement for all pixelTweaking
		}
		if (config.sepia) {
			this.setSepia(config, ctx, canvasWidth, canvasHeight);
		}
		if (config.gaussian) {
			this.setGaussian(config, ctx, canvasWidth, canvasHeight, imgPixels);
		}
		if (config.vingette) {
			this.setVingette(config, ctx, canvasWidth, canvasHeight);
		}
		if (config.border){
			if (config.border.width > 0 || config.border.image){
				this.setBorder(config, ctx, canvasWidth, canvasHeight);
			}
			
		}
		
		return canvas.toDataURL(); //not sure where to put this yet but seems useful

	}