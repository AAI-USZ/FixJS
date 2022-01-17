function (gradient, stops, parenColors) {
			
				var i, l = stops.length,
					colorStop, stop_parts, color, color_pos, colorStops = [];
			
				// Loop through all color stops
				for (i = 0; i < l; i++) {
					colorStop = stops[i].trim();
					
					// If the last position was more than or equal to 100 %,
					// the following would not be visible anyway, so setting it is unnecessary
					if (color_pos >= 100) {
						break;
					}
					
					// Split the color stop value to separate the color from the position
					// Using space is OK, since hsla() values and such are stripped away up at the top
					// Positions outside the range 0 - 100 % are not supported at the moment
					if (~colorStop.indexOf(" ")) {
						stop_parts = colorStop.split(" ");
						color = stop_parts[0];
						color_pos = stop_parts[1];
						
						// Convert a pixel value to a percentage
						if (~color_pos.indexOf("px")) {
							color_pos = parseFloat(color_pos) / Math.sqrt(Math.pow(eX - sX, 2) + Math.pow(eY - sY, 2)) * 100;
						} else {
							color_pos = parseFloat(color_pos);
						}
					}
					
					// No position was specified, so one will be generated
					else {
						color = colorStop;
						
						// Set first position to 0 if not set before
						if (color_pos === undefined) {
							color_pos = 0;
						}
						
						// Set the next position if it's not the first one
						else {
							color_pos = color_pos + ((100 - color_pos) / (l - i));
						}
					}
					
					// Get the saved color value if the color contained parentheses when passed in to this method
					if (~color.indexOf("###")) {
						color = parenColors[/###(\d+)###/.exec(color)[1]];
					}
					
					// Add color data to an array with all color stops
					colorStops.push({
						pos: color_pos,
						color: color
					});
				}
				
				return colorStops;
			}