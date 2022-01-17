function() {
				var ctx = me._canvas.getContext('2d');
				var w = 256;
				var h = 256;
				me._canvas.width = w;
				me._canvas.height = h;
				var imgData = ctx.getImageData(0, 0, w, h);
				var pixels = imgData.data;
				var x, y, pixelIndex = 0;
				var pixelVal;
				for ( y = 0; y < h; y += 1) {
					for ( x = 0; x < w; x += 1) {
						pixelVal = me._getPixelValue(me._zValue, x, y);
						pixels[pixelIndex] = pixelVal.r;
						pixels[pixelIndex + 1] = pixelVal.g;
						pixels[pixelIndex + 2] = pixelVal.b;
						pixels[pixelIndex + 3] = 255;
						pixelIndex += 4;
					}
				}
				ctx.putImageData(imgData, 0, 0);
			}