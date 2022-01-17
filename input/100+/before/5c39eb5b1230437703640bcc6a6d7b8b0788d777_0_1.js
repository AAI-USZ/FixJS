function(){
				/**
				 * We can draw horizontal or vertical bars depending on the
				 * value of the 'barDirection' option (which may be 'vertical' or
				 * 'horizontal').
				 */

				var horizontal = (o.barDirection == 'horizontal');

				canvasContain.addClass('visualize-bar');

				/**
				 * Write labels along the bottom of the chart.	If we're drawing
				 * horizontal bars, these will be the yLabels, otherwise they
				 * will be the xLabels.	The positioning also varies slightly:
				 * yLabels are values, hence they will span the whole width of
				 * the canvas, whereas xLabels are supposed to line up with the
				 * bars.
				 */
				var bottomLabels = horizontal ? yLabels : xLabels;

				var xInterval = canvas.width() / (bottomLabels.length - (horizontal ? 1 : 0));

				var xlabelsUL = $('<ul class="visualize-labels-x"></ul>')
					.width(canvas.width())
					.height(canvas.height())
					.insertBefore(canvas);

				$.each(bottomLabels, function(i){
					var thisLi = $('<li><span class="label">'+this+'</span></li>')
						.prepend('<span class="line" />')
						.css('left', xInterval * i)
						.width(xInterval)
						.appendTo(xlabelsUL);

					if (horizontal)	{
						var label = thisLi.find('span.label');
						label.css("margin-left", -label.width() / 2);
					}
				});

				/**
				 * Write labels along the left of the chart.	Follows the same idea
				 * as the bottom labels.
				 */
				leftLabels = horizontal ? xLabels : yLabels;
				var liBottom = canvas.height() / (leftLabels.length - (horizontal ? 0 : 1));

				var ylabelsUL = $('<ul class="visualize-labels-y"></ul>')
					.width(canvas.width())
					.height(canvas.height())
					.insertBefore(canvas);

				$.each(leftLabels, function(i){
					var thisLi = $('<li><span>'+this+'</span></li>').prependTo(ylabelsUL);

					var label = thisLi.find('span:not(.line)').addClass('label');

					if (horizontal) {
						thisLi.css({'top': liBottom * i, 'height': liBottom});
						label.css('height', liBottom);

						// This is needed for the vertical align to work properly:
						// http://www.ampsoft.net/webdesign-l/vertical-aligned-nav-list.html
						label.css('line-height', parseInt(liBottom) + 'px');

						label.css('vertical-align', 'middle');
					}
					else {
						thisLi.css('bottom', liBottom * i).prepend('<span class="line" />');
						label.css('margin-top', -label.height() / 2)
					}
				});

				// Draw bars

				if (horizontal) {
					// for horizontal, keep the same code, but rotate everything 90 degrees
					// clockwise.
					ctx.rotate(Math.PI / 2);
				}
				else {
					// for vertical, translate to the top left corner.
					ctx.translate(0, zeroLoc);
				}

				var yScale = (horizontal ? canvas.width() : canvas.height()) / totalYRange;
				var barWidth = horizontal ? (canvas.height() / xLabels.length) : (canvas.width() / (bottomLabels.length));
				var linewidth = (barWidth - o.barGroupMargin*2) / dataGroups.length;

				for(var h=0; h<dataGroups.length; h++){
					ctx.beginPath();

					var strokeWidth = linewidth - (o.barMargin*2);
					ctx.lineWidth = strokeWidth;
					var points = dataGroups[h].points;
					var integer = 0;
					for(var i=0; i<points.length; i++){
						var xVal = (integer-o.barGroupMargin)+(h*linewidth)+linewidth/2;
						xVal += o.barGroupMargin*2;
						
						ctx.moveTo(xVal, 0);
						ctx.lineTo(xVal, Math.round(-points[i]*yScale));
						integer+=barWidth;
					}
					ctx.strokeStyle = dataGroups[h].color;
					ctx.stroke();
					ctx.closePath();
				}
			}