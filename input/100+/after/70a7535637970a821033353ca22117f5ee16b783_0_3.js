function(slice, i){
						if(!slice.omit){
							var leftColumn = circle.cx - circle.r * 2,
								rightColumn = circle.cx + circle.r * 2,
								labelWidth = g._base._getTextBox(labels[i], {font: slice.theme.series.font}).w,
								x = circle.cx + slice.labelR * Math.cos(slice.angle),
								y = circle.cy + slice.labelR * Math.sin(slice.angle),
								jointX = (slice.left) ? (leftColumn + labelWidth) : (rightColumn - labelWidth),
								labelX = (slice.left) ? leftColumn : jointX;
							var wiring = s.createPath().moveTo(circle.cx + circle.r * Math.cos(slice.angle), circle.cy + circle.r * Math.sin(slice.angle));
							if(Math.abs(slice.labelR * Math.cos(slice.angle)) < circle.r * 2 - labelWidth){
								wiring.lineTo(x, y);
							}
							wiring.lineTo(jointX, y).setStroke(slice.theme.series.labelWiring);
							var elem = da.createText[this.opt.htmlLabels && g.renderer != "vml" ? "html" : "gfx"](
								this.chart, s, labelX, y, "left", labels[i], slice.theme.series.font, slice.theme.series.fontColor);
							if(this.opt.htmlLabels){
								this.htmlElements.push(elem);
							}
						}
					}