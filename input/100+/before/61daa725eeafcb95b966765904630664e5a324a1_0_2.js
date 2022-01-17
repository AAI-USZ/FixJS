function(image, dx, dy, dWidth, dHeight) {
				var i, x, y, alpha;
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
				canvas_tmp.width = CANVAS_WIDTH;
				canvas_tmp.height = CANVAS_HEIGHT;
					
				var context_tmp = canvas.getContext('2d');
				context_tmp.globalAlpha = 1;
				context_tmp.drawImage.apply(context_tmp, args);
				
				// composite image onto hdr canvas
				var blend = getBlendFunction(context.globalBlendMode);
				var data  = context_tmp.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
				var x_min = Math.floor(dx);
				var y_min = Math.floor(dy);
				var x_max = Math.ceil(dx + dWidth);
				var y_max = Math.ceil(dy + dHeight);
				for (y = y_min; y < y_max; y++) {
					for (x = x_min; x < x_max; x++) {
						i = dy * CANVAS_WIDTH + dx;
						alpha = data[i+3] * context.globalAlpha;
						imageData2DHDR[i] = blend(imageData2DHDR[i], data[i], alpha);
						imageData2DHDR[i+1] = blend(imageData2DHDR[i+1], data[i+1], alpha);
						imageData2DHDR[i+2] = blend(imageData2DHDR[i+2], data[i+2], alpha);
						imageData2DHDR[i+3] = Math.min(255, imageData2DHDR[i+3] + alpha);
					}
				}
				
				delete context_tmp;
				delete canvas_tmp;
			}