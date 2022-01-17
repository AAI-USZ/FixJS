function() {
				var ranges = [];
				for (var k in context.range) {
					if (context.range.hasOwnProperty(k)) {
						ranges.push(context.range[k]);
					}
				}
				
				for (var r, i = 0, n = context.imageData.data.length; i < n; i++) {
					r = context.range[i % 4];
					imageData2D[i] = (context.imageData.data[i] - r.low) / (r.high - r.low) * 255;
				}
				
				context2D.putImageData(imageData2D, 0, 0);
			}