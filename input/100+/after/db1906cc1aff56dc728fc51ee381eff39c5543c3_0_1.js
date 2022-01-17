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
				
				var context_tmp = canvas_tmp.getContext('2d');
				context_tmp.globalAlpha = 1;
				context_tmp.drawImage.apply(context_tmp, args);
				
				// composite image onto hdr canvas
				var alpha_src, alpha_dest, alpha_merged;
				var blend = getBlendFunction(context.globalBlendMode);
				var data  = context_tmp.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT).data;
				var x_min = Math.floor(dx);
				var y_min = Math.floor(dy);
				var x_max = Math.ceil(dx + dWidth);
				var y_max = Math.ceil(dy + dHeight);
				var x_max = Math.min(CANVAS_WIDTH, Math.ceil(dx + dWidth));
				var y_max = Math.min(CANVAS_WIDTH, Math.ceil(dy + dHeight));
				for (y = y_min; y < y_max; y++) {
					for (x = x_min; x < x_max; x++) {
						i = (y * CANVAS_WIDTH + x) * 4;
						
						alpha_src = imageData2DHDR.data[i+3] / 255;
						alpha_dest = (data[i+3] * context.globalAlpha) / 255;
						alpha_merged = Math.min(1, alpha_src + alpha_dest * (1 - alpha_src));
						
						imageData2DHDR.data[i] = blend(imageData2DHDR.data[i], data[i], alpha_src, alpha_dest, alpha_merged);
						imageData2DHDR.data[i+1] = blend(imageData2DHDR.data[i+1], data[i+1], alpha_src, alpha_dest, alpha_merged);
						imageData2DHDR.data[i+2] = blend(imageData2DHDR.data[i+2], data[i+2], alpha_src, alpha_dest, alpha_merged);
						imageData2DHDR.data[i+3] = alpha_merged * 255;
					}
				}
				
				delete context_tmp;
				delete canvas_tmp;
				context.render();
			}