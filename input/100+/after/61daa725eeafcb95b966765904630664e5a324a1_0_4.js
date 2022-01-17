function() {
			if (arguments[0] !== 'hdr2d') {
				return base.apply(this, arguments);
			}
			
			// setup
			// -------------------------------------------------------

			var canvas = this;
			
			var CANVAS_WIDTH    = canvas.width;
			var CANVAS_HEIGHT   = canvas.height;
			var context2D       = base.apply(this, ['2d']);
			var imageData2D     = context2D.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
			var imageData2DHDR  = new ImageDataHDR(CANVAS_WIDTH, CANVAS_HEIGHT);
			
			var context = {
				canvas: canvas,
				globalAlpha: 1,
				globalBlendMode: HDR2D_BLEND_NORMAL,
				imageData: imageData2DHDR,
				range: {
					r: {low: 0, high: 255},
					g: {low: 0, high: 255},
					b: {low: 0, high: 255},
					a: {low: 0, high: 255}
				}
			};
			
			// private methods
			// -------------------------------------------------------
		
			/**
			 * Returns a 2-dimensional slice of the image data
			 * as an 
			 * @param {int} x      - x coordinate (px).
			 * @param {int} y      - y coordinate (px).
			 * @param {int} width  - width of the slice (px).
			 * @param {int} height - height of the slice (px).
			 */
			var getImageDataSlice = function(x, y, width, height) {
				var i, j, loc;
				
				var w = Math.min(width, CANVAS_WIDTH - x);
				var h = Math.min(height, CANVAS_HEIGHT - y);
				var i_bound = x + w;
				var j_bound = y + h;
				
				var result = new ImageDataHDR(w, h);
				var data_pos = 0;
				
				for (j = y; j < j_bound; j++) {
					for (i = x; i < i_bound; i++) {
						loc = (j * CANVAS_WIDTH + i) * 4;
						result.data[data_pos++] = imageData2DHDR.data[loc];
						result.data[data_pos++] = imageData2DHDR.data[loc+1];
						result.data[data_pos++] = imageData2DHDR.data[loc+2];
						result.data[data_pos++] = imageData2DHDR.data[loc+3];
					}
				}
				
				return result;
			};
			
			/**
			 * Returns a function used for blending individual color components,
			 * given a particular blend mode.
			 *
			 * @param {int}  mode - HDR2D_BLEND_NORMAL, HDR2D_BLEND_ADD, etc.
			 */
			var getBlendFunction = (function() {
				var modes = {};
				
				var composite = function(comp_base, comp_new, alpha) {
					return comp_base + (comp_new - comp_base) * (alpha / 255);
				};
				
				modes[HDR2D_BLEND_NORMAL] = function(comp_base, comp_new, alpha) {
					return composite(comp_base, comp_new, alpha);
				};
				modes[HDR2D_BLEND_ADD] = function(comp_base, comp_new, alpha) {
					return composite(comp_base, comp_base + comp_new, alpha);
				};
				modes[HDR2D_BLEND_SUBTRACT] = function(comp_base, comp_new, alpha) {
					return composite(comp_base, Math.max(0, comp_base - comp_new), alpha);
				};
				
				return function(mode) {
					return modes[mode];
				};
			})();
			
			// public methods
			// -------------------------------------------------------
		
			/**
			 * Sets the color at the given position.
			 * @param {int}    x     - x coordinate.
			 * @param {int}    y     - y coordinate.
			 * @param {object} color - An object containing r, g, b, a color components.
			 */
			context.setPixel = function(x, y, color) {
				var i = (x + y * CANVAS_WIDTH) * 4;
				var blend = getBlendFunction(context.globalBlendMode);
				
				if (typeof color.a === 'undefined') {
					color.a = 255;
				}
				
				imageData2DHDR.data[i]   = blend(imageData2DHDR.data[i], color.r, color.a);
				imageData2DHDR.data[i+1] = blend(imageData2DHDR.data[i+1], color.g, color.a);
				imageData2DHDR.data[i+2] = blend(imageData2DHDR.data[i+2], color.b, color.a);
				imageData2DHDR.data[i+3] = Math.min(255, imageData2DHDR.data[i+3] + alpha);
				
				// TODO: render this pixel
			};
			
			/**
			 * Returns the color at the given position.
			 * @param {int} x - x coordinate.
			 * @param {int} y - y coordinate.
			 * @returns {object}
			 */
			context.getPixel = function(x, y) {
				var i = (x + y * CANVAS_WIDTH) * 4;
				return {
					r: imageData2DHDR.data[i],
					g: imageData2DHDR.data[i+1],
					b: imageData2DHDR.data[i+2],
					a: imageData2DHDR.data[i+3]
				}
			};
		
			/**
			 * Returns the image data for a given region of the canvas context.
			 * (for drop-in replacement)
			 *
			 * @param {int} x      - x coordinate (px).
			 * @param {int} y      - y coordinate (px).
			 * @param {int} width  - width of the slice (px).
			 * @param {int} height - height of the slice (px).
			 */
			context.getImageData = function(x, y, width, height) {
				if (x === 0 && y === 0 && width === canvas_height && height === canvas_height) {
					return context.imageData;
				} else {
					return getImageDataSlice(x, y, width, height);
				}
			};
			
			/**
			 * Draws an image to the canvas.
			 * (for drop-in replacement)
			 *
			 * @param {object} image - HTMLImageElement or HTMLCanvasElement or HTMLVideoElement.
			 * @param {number} dx - Destination x coordinate (px).
			 * @param {number} dy - Destination x coordinate (px).
			 * @param {number} dWidth - Destination width (px).
			 * @param {number} dHeight - Destination height (px).
			 */
			context.drawImage = function(image, dx, dy, dWidth, dHeight) {
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
				var blend = getBlendFunction(context.globalBlendMode);
				var data  = context_tmp.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT).data;
				var x_min = Math.floor(dx);
				var y_min = Math.floor(dy);
				var x_max = Math.ceil(dx + dWidth);
				var y_max = Math.ceil(dy + dHeight);
				for (y = y_min; y < y_max; y++) {
					for (x = x_min; x < x_max; x++) {
						i = (y * CANVAS_WIDTH + x) * 4;
						alpha = data[i+3] * context.globalAlpha;
						imageData2DHDR.data[i] = blend(imageData2DHDR.data[i], data[i], alpha);
						imageData2DHDR.data[i+1] = blend(imageData2DHDR.data[i+1], data[i+1], alpha);
						imageData2DHDR.data[i+2] = blend(imageData2DHDR.data[i+2], data[i+2], alpha);
						imageData2DHDR.data[i+3] = Math.min(255, imageData2DHDR.data[i+3] + alpha);
					}
				}
				delete context_tmp;
				delete canvas_tmp;
				context.render();
			};
			
			/**
			 * Transforms the HDR data in its entirety into the 
			 * 8-bit color representation and  renders it to the canvas.
			 */
			context.render = function() {
				var ranges = [];
				for (var k in context.range) {
					if (context.range.hasOwnProperty(k)) {
						ranges.push(context.range[k]);
					}
				}
				for (var r, i = 0, n = imageData2DHDR.data.length; i < n; i++) {
					r = ranges[i % 4];
					imageData2D.data[i] = (imageData2DHDR.data[i] - r.low) / (r.high - r.low) * 255;
				}
				context2D.putImageData(imageData2D, 0, 0);
			};
			
			return context;
		}