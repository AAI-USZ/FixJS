function(opts) {
				var mode = svgCanvas.getMode();
				if (mode == "eyedropper") {
					var e = opts.event;
					var target = e.target;
					currentStyle.fillPaint = target.getAttribute("fill") || "white";
  				currentStyle.fillOpacity = target.getAttribute("fill-opacity") || 1.0;
  				currentStyle.strokePaint = target.getAttribute("stroke");
  				currentStyle.strokeOpacity = target.getAttribute("stroke-opacity") || 1.0;
  				currentStyle.strokeWidth = target.getAttribute("stroke-width");
  				currentStyle.strokeDashArray = target.getAttribute("stroke-dasharray");
  				currentStyle.strokeLinecap = target.getAttribute("stroke-linecap");
  				currentStyle.strokeLinejoin = target.getAttribute("stroke-linejoin");
  				currentStyle.opacity = target.getAttribute("opacity") || 1.0;
					if ($.inArray(target.nodeName, ['g', 'use']) == -1) {
						var changes = {};

						var change = function(elem, attrname, newvalue) {
							changes[attrname] = elem.getAttribute(attrname);
							elem.setAttribute(attrname, newvalue);
						};
						
						if (currentStyle.fillPaint) 		change(opts.selectedElements[0], "fill", currentStyle.fillPaint);
						if (currentStyle.fillOpacity) 		change(opts.selectedElements[0], "fill-opacity", currentStyle.fillOpacity);
						if (currentStyle.strokePaint) 		change(opts.selectedElements[0], "stroke", currentStyle.strokePaint);
						if (currentStyle.strokeOpacity) 	change(opts.selectedElements[0], "stroke-opacity", currentStyle.strokeOpacity);
						if (currentStyle.strokeWidth) 		change(opts.selectedElements[0], "stroke-width", currentStyle.strokeWidth);
						if (currentStyle.strokeDashArray) 	change(opts.selectedElements[0], "stroke-dasharray", currentStyle.strokeDashArray);
						if (currentStyle.opacity) 			change(opts.selectedElements[0], "opacity", currentStyle.opacity);
						if (currentStyle.strokeLinecap) 	change(opts.selectedElements[0], "stroke-linecap", currentStyle.strokeLinecap);
						if (currentStyle.strokeLinejoin) 	change(opts.selectedElements[0], "stroke-linejoin", currentStyle.strokeLinejoin);
						
						addToHistory(new ChangeElementCommand(target, changes));
					}
				}
			}