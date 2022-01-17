function(x, y, color) {
				var i = (Math.round(x) + Math.round(y) * CANVAS_WIDTH) * 4;
				var blend = getBlendFunction(context.globalBlendMode);
				
				if (typeof color.a === 'undefined') {
					color.a = 255;
				}
				
				var alpha_src = imageData2DHDR.data[i+3] / 255;
				var alpha_dest = color.a * context.globalAlpha / 255;
				var alpha_merged = Math.min(1, alpha_src + alpha_dest * (1 - alpha_src));
				
				imageData2DHDR.data[i]   = blend(imageData2DHDR.data[i], color.r, alpha_src, alpha_dest, alpha_merged);
				imageData2DHDR.data[i+1] = blend(imageData2DHDR.data[i+1], color.g, alpha_src, alpha_dest, alpha_merged);
				imageData2DHDR.data[i+2] = blend(imageData2DHDR.data[i+2], color.b, alpha_src, alpha_dest, alpha_merged);
				imageData2DHDR.data[i+3] = alpha_merged * 255;
				
				imageData2DPixel.data[0] = (imageData2DHDR.data[i] - context.range.r.low) / (context.range.r.high - context.range.r.low) * 255;
				imageData2DPixel.data[1] = (imageData2DHDR.data[i+1] - context.range.g.low) / (context.range.g.high - context.range.g.low) * 255;
				imageData2DPixel.data[2] = (imageData2DHDR.data[i+2] - context.range.b.low) / (context.range.b.high - context.range.b.low) * 255;
				imageData2DPixel.data[3] = (imageData2DHDR.data[i+3] - context.range.a.low) / (context.range.a.high - context.range.a.low) * 255;
				context2D.putImageData(imageData2DPixel, x, y);
			}