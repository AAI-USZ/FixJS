function(x, y, color) {
				var i = x + y * CANVAS_WIDTH;
				var blend = getBlendFunction(context.globalBlendMode);
				
				if (typeof color.a === 'undefined') {
					color.a = 255;
				}
				
				imageData2DHDR.data[i]   = blend(imageData2DHDR.data[i], color.r, color.a);
				imageData2DHDR.data[i+1] = blend(imageData2DHDR.data[i+1], color.g, color.a);
				imageData2DHDR.data[i+2] = blend(imageData2DHDR.data[i+2], color.b, color.a);
				imageData2DHDR.data[i+3] = Math.min(255, imageData2DHDR.data[i+3] + alpha);
				
				// TODO: render this pixel
			}