function() {
			
			var backgroundGradient = this.backgroundGradient;
				colors = backgroundGradient.colors,
				type = backgroundGradient.type,
				cssVal = type + "-gradient(";
			
			// Convert common units to absolute
			var startPointX = computeSize(backgroundGradient.startPoint.x, this._measuredWidth),
				startPointY = computeSize(backgroundGradient.startPoint.y, this._measuredHeight),
				centerX = computeSize("50%", this._measuredWidth),
				centerY = computeSize("50%", this._measuredHeight),
				numColors = colors.length;
			
			if (type === "linear") {
				
				// Convert linear specific values to absolute
				var endPointX = computeSize(backgroundGradient.endPoint.x, this._measuredWidth),
					endPointY = computeSize(backgroundGradient.endPoint.y, this._measuredHeight);
					
				var userGradientStart,
					userGradientEnd;
				if (Math.abs(startPointX - endPointX) < 0.01) {
					// Vertical gradient shortcut
					if (startPointY < endPointY) {
						userGradientStart = startPointY;
						userGradientEnd = endPointY;
						cssVal += "270deg";
					} else {
						userGradientStart = endPointY;
						userGradientEnd = startPointY;
						cssVal += "90deg";
					}
				} else if(Math.abs(startPointY - endPointY) < 0.01) {
					// Horizontal gradient shortcut
					if (startPointX < endPointX) {
						userGradientStart = startPointX;
						userGradientEnd = endPointX;
						cssVal += "0deg";
					} else {
						userGradientStart = endPointX;
						userGradientEnd = startPointX;
						cssVal += "180deg";
					}
				}else {
					
					// Rearrange values so that start is to the left of end
					var mirrorGradient = false;
					if (startPointX > endPointX) {
						mirrorGradient = true;
						var temp = startPointX;
						startPointX = endPointX;
						endPointX = temp;
						temp = startPointY;
						startPointY = endPointY;
						endPointY = temp;
					}
					
					// Compute the angle, start location, and end location of the gradient
					var angle = Math.atan2(endPointY - startPointY, endPointX - startPointX)
						tanAngle = Math.tan(angle),
						cosAngle = Math.cos(angle),
						originLineIntersection = centerY - centerX * tanAngle;
						userDistance = (startPointY - startPointX * tanAngle - originLineIntersection) * cosAngle,
						userXOffset = userDistance * Math.sin(angle),
						userYOffset = userDistance * cosAngle,
						startPointX = startPointX + userXOffset,
						startPointY = startPointY - userYOffset,
						endPointX = endPointX + userXOffset,
						endPointY = endPointY - userYOffset,
						shiftedAngle = Math.PI / 2 - angle;
					if (angle > 0) {
						var globalGradientStartDistance = originLineIntersection * Math.sin(shiftedAngle),
							globalGradientStartOffsetX = -globalGradientStartDistance * Math.cos(shiftedAngle),
							globalGradientStartOffsetY = globalGradientStartDistance * Math.sin(shiftedAngle);
						userGradientStart = Math.sqrt(Math.pow(startPointX - globalGradientStartOffsetX,2) + Math.pow(startPointY - globalGradientStartOffsetY,2));
						userGradientEnd = Math.sqrt(Math.pow(endPointX - globalGradientStartOffsetX,2) + Math.pow(endPointY - globalGradientStartOffsetY,2));
					} else {
						var globalGradientStartDistance = (this._measuredHeight - originLineIntersection) * Math.sin(shiftedAngle),
							globalGradientStartOffsetX = -globalGradientStartDistance * Math.cos(shiftedAngle),
							globalGradientStartOffsetY = this._measuredHeight - globalGradientStartDistance * Math.sin(shiftedAngle);
						userGradientStart = Math.sqrt(Math.pow(startPointX - globalGradientStartOffsetX,2) + Math.pow(startPointY - globalGradientStartOffsetY,2));
						userGradientEnd = Math.sqrt(Math.pow(endPointX - globalGradientStartOffsetX,2) + Math.pow(endPointY - globalGradientStartOffsetY,2));
					}
					
					// Set the angle info for the gradient
					angle = mirrorGradient ? angle + Math.PI : angle;
					cssVal += Math.round((360 * (2 * Math.PI - angle) / (2 * Math.PI))) + "deg";
				}
				
				// Calculate the color stops
				for (var i = 0; i < numColors; i++) {
					var color = colors[i];
					if (is(color,"String")) {
						color = { color: color };
					}
					if (!is(color.offset,"Number")) {
						color.offset = i / (numColors - 1);
					}
					cssVal += "," + color.color + " " + Math.round(computeSize(100 * color.offset + "%", userGradientEnd - userGradientStart) + userGradientStart) + "px";
				}
				
			} else if (type === "radial") {
				
				// Convert radial specific values to absolute
				var radiusTotalLength = Math.min(this._measuredWidth,this._measuredHeight),
					startRadius = computeSize(backgroundGradient.startRadius, radiusTotalLength),
					endRadius = computeSize(backgroundGradient.endRadius, radiusTotalLength);
				
				var colorList = [],
					mirrorGradient = false;
				if (startRadius > endRadius) {
					var temp = startRadius;
					startRadius = endRadius;
					endRadius = temp;
					mirrorGradient = true;
					
					for (var i = 0; i <= (numColors - 2) / 2; i++) {
						var mirroredPosition = numColors - i - 1;
						colorList[i] = colors[mirroredPosition],
						colorList[mirroredPosition] = colors[i];
					}
					if (numColors % 2 === 1) {
						var middleIndex = Math.floor(numColors / 2);
						colorList[middleIndex] = colors[middleIndex];
					}
				} else {
					for (var i = 0; i < numColors; i++) {
						colorList[i] = colors[i];
					}
				}
				
				cssVal += startPointX + "px " + startPointY + "px";
				
				// Calculate the color stops
				for (var i = 0; i < numColors; i++) {
					var color = colorList[i];
					if (is(color,"String")) {
						color = { color: color };
					}
					var offset;
					if (!is(color.offset,"Number")) {
						offset = i / (numColors - 1);
					} else {
						offset = mirrorGradient ? numColors % 2 === 1 && i === Math.floor(numColors / 2) ? color.offset : 1 - color.offset : color.offset;
					}
					cssVal += "," + color.color + " " + Math.round(computeSize(100 * offset + "%", endRadius - startRadius) + startRadius) + "px";
				}
			}

			cssVal += ")";

			require.each(require.config.vendorPrefixes.css, lang.hitch(this,function(vendorPrefix) {
				setStyle(this.domNode, "backgroundImage", vendorPrefix + cssVal);
			}));
		}