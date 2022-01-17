function(slice, i){
						if(slice <= 0){
							// degenerated slice
							return false;	// continue
						}
						var theme = themes[i];
						if(slice >= 1){
							// whole pie
							var v = run[i], elem = da.createText[this.opt.htmlLabels && g.renderer != "vml" ? "html" : "gfx"](
									this.chart, s, circle.cx, circle.cy + size / 2, "middle", labels[i],
									theme.series.font, theme.series.fontColor);
							if(this.opt.htmlLabels){
								this.htmlElements.push(elem);
							}
							return true;	// stop iteration
						}
						// calculate the geometry of the slice
						var end = start + slice * 2 * Math.PI, v = run[i];
						if(i + 1 == slices.length){
							end = startAngle + 2 * Math.PI;
						}
						if(this.opt.omitLabels && end-start < 0.001){
							return false;	// continue
						}
						var	labelAngle = (start + end) / 2,
							x = circle.cx + labelR * Math.cos(labelAngle),
							y = circle.cy + labelR * Math.sin(labelAngle) + size / 2;
						// draw the label
						var elem = da.createText[this.opt.htmlLabels && g.renderer != "vml" ? "html" : "gfx"]
								(this.chart, s, x, y, "middle", labels[i], theme.series.font, theme.series.fontColor);
						if(this.opt.htmlLabels){
							this.htmlElements.push(elem);
						}
						start = end;
						return false;	// continue
					}