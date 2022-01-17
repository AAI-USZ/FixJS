function(dim, offsets){
			//	summary:
			//		Render/draw the axis.
			//	dim: Object
			//		An object of the form { width, height}.
			//	offsets: Object
			//		An object of the form { l, r, t, b }.
			//	returns: dojox.charting.axis2d.Default
			//		The reference to the axis for functional chaining.
			if(!this.dirty){
				return this;	//	dojox.charting.axis2d.Default
			}
			// prepare variable
			var o = this.opt, ta = this.chart.theme.axis, leftBottom = o.leftBottom, rotation = o.rotation % 360,
				start, stop, titlePos, titleRotation=0, titleOffset, axisVector, tickVector, anchorOffset, labelOffset, labelAlign,

				// TODO: we use one font --- of major tick, we need to use major and minor fonts
				taFont = o.font || (ta.majorTick && ta.majorTick.font) || (ta.tick && ta.tick.font),
				taTitleFont = o.titleFont || (ta.tick && ta.tick.titleFont),
				// TODO: we use one font color --- we need to use different colors
				taFontColor = o.fontColor || (ta.majorTick && ta.majorTick.fontColor) || (ta.tick && ta.tick.fontColor) || "black",
				taTitleFontColor = o.titleFontColor || (ta.tick && ta.tick.titleFontColor) || "black",
				taTitleGap = (o.titleGap==0) ? 0 : o.titleGap || (ta.tick && ta.tick.titleGap) || 15,
				taTitleOrientation = o.titleOrientation || (ta.tick && ta.tick.titleOrientation) || "axis",
				taMajorTick = this.chart.theme.getTick("major", o),
				taMinorTick = this.chart.theme.getTick("minor", o),
				taMicroTick = this.chart.theme.getTick("micro", o),

				tickSize = Math.max(taMajorTick.length, taMinorTick.length, taMicroTick.length),
				taStroke = "stroke" in o ? o.stroke : ta.stroke,
				size = taFont ? g.normalizedLength(g.splitFontString(taFont).size) : 0,
				cosr = Math.abs(Math.cos(rotation * Math.PI / 180)),
				sinr = Math.abs(Math.sin(rotation * Math.PI / 180)),
				tsize = taTitleFont ? g.normalizedLength(g.splitFontString(taTitleFont).size) : 0;
			if(rotation < 0){
				rotation += 360;
			}
			if(this.vertical){
				start = {y: dim.height - offsets.b};
				stop  = {y: offsets.t};
				titlePos = {y: (dim.height - offsets.b + offsets.t)/2};
				titleOffset = size * sinr + (this._cachedLabelWidth || 0) * cosr + labelGap + Math.max(taMajorTick.length, taMinorTick.length) + tsize + taTitleGap;
				axisVector = {x: 0, y: -1};
				labelOffset = {x: 0, y: 0};
				tickVector = {x: 1, y: 0};
				anchorOffset = {x: labelGap, y: 0};
				switch(rotation){
					case 0:
						labelAlign = "end";
						labelOffset.y = size * 0.4;
						break;
					case 90:
						labelAlign = "middle";
						labelOffset.x = -size;
						break;
					case 180:
						labelAlign = "start";
						labelOffset.y = -size * 0.4;
						break;
					case 270:
						labelAlign = "middle";
						break;
					default:
						if(rotation < centerAnchorLimit){
							labelAlign = "end";
							labelOffset.y = size * 0.4;
						}else if(rotation < 90){
							labelAlign = "end";
							labelOffset.y = size * 0.4;
						}else if(rotation < (180 - centerAnchorLimit)){
							labelAlign = "start";
						}else if(rotation < (180 + centerAnchorLimit)){
							labelAlign = "start";
							labelOffset.y = -size * 0.4;
						}else if(rotation < 270){
							labelAlign = "start";
							labelOffset.x = leftBottom ? 0 : size * 0.4;
						}else if(rotation < (360 - centerAnchorLimit)){
							labelAlign = "end";
							labelOffset.x = leftBottom ? 0 : size * 0.4;
						}else{
							labelAlign = "end";
							labelOffset.y = size * 0.4;
						}
				}
				if(leftBottom){
					start.x = stop.x = offsets.l;
					titleRotation = (taTitleOrientation && taTitleOrientation == "away") ? 90 : 270;
					titlePos.x = offsets.l - titleOffset + (titleRotation == 270 ? tsize : 0);
					tickVector.x = -1;
					anchorOffset.x = -anchorOffset.x;
				}else{
					start.x = stop.x = dim.width - offsets.r;
					titleRotation = (taTitleOrientation && taTitleOrientation == "axis") ? 90 : 270;
					titlePos.x = dim.width - offsets.r + titleOffset - (titleRotation == 270 ? 0 : tsize);
					switch(labelAlign){
						case "start":
							labelAlign = "end";
							break;
						case "end":
							labelAlign = "start";
							break;
						case "middle":
							labelOffset.x += size;
							break;
					}
				}
			}else{
				start = {x: offsets.l};
				stop  = {x: dim.width - offsets.r};
				titlePos = {x: (dim.width - offsets.r + offsets.l)/2};
				titleOffset = size * cosr + (this._cachedLabelWidth || 0) * sinr + labelGap + Math.max(taMajorTick.length, taMinorTick.length) + tsize + taTitleGap;
				axisVector = {x: 1, y: 0};
				labelOffset = {x: 0, y: 0};
				tickVector = {x: 0, y: 1};
				anchorOffset = {x: 0, y: labelGap};
				switch(rotation){
					case 0:
						labelAlign = "middle";
						labelOffset.y = size;
						break;
					case 90:
						labelAlign = "start";
						labelOffset.x = -size * 0.4;
						break;
					case 180:
						labelAlign = "middle";
						break;
					case 270:
						labelAlign = "end";
						labelOffset.x = size * 0.4;
						break;
					default:
						if(rotation < (90 - centerAnchorLimit)){
							labelAlign = "start";
							labelOffset.y = leftBottom ? size : 0;
						}else if(rotation < (90 + centerAnchorLimit)){
							labelAlign = "start";
							labelOffset.x = -size * 0.4;
						}else if(rotation < 180){
							labelAlign = "start";
							labelOffset.y = leftBottom ? 0 : -size;
						}else if(rotation < (270 - centerAnchorLimit)){
							labelAlign = "end";
							labelOffset.y = leftBottom ? 0 : -size;
						}else if(rotation < (270 + centerAnchorLimit)){
							labelAlign = "end";
							labelOffset.y = leftBottom ? size * 0.4 : 0;
						}else{
							labelAlign = "end";
							labelOffset.y = leftBottom ? size : 0;
						}
				}
				if(leftBottom){
					start.y = stop.y = dim.height - offsets.b;
					titleRotation = (taTitleOrientation && taTitleOrientation == "axis") ? 180 : 0;
					titlePos.y = dim.height - offsets.b + titleOffset - (titleRotation ? tsize : 0);
				}else{
					start.y = stop.y = offsets.t;
					titleRotation = (taTitleOrientation && taTitleOrientation == "away") ? 180 : 0;
					titlePos.y = offsets.t - titleOffset + (titleRotation ? 0 : tsize);
					tickVector.y = -1;
					anchorOffset.y = -anchorOffset.y;
					switch(labelAlign){
						case "start":
							labelAlign = "end";
							break;
						case "end":
							labelAlign = "start";
							break;
						case "middle":
							labelOffset.y -= size;
							break;
					}
				}
			}

			// render shapes

			this.cleanGroup();

			try{
				var s = this.group,
					c = this.scaler,
					t = this.ticks,
					canLabel,
					f = lin.getTransformerFromModel(this.scaler),
					// GFX Canvas now supports labels, so let's _not_ fallback to HTML anymore on canvas, just use
					// HTML labels if explicitly asked + no rotation + no IE + no Opera
					labelType = !titleRotation && !rotation && this.opt.htmlLabels && !has("ie") && !has("opera") ? "html" : "gfx",
					dx = tickVector.x * taMajorTick.length,
					dy = tickVector.y * taMajorTick.length;

				s.createLine({
					x1: start.x,
					y1: start.y,
					x2: stop.x,
					y2: stop.y
				}).setStroke(taStroke);
				
				//create axis title
				if(o.title){
					var axisTitle = acommon.createText[labelType](
						this.chart,
						s,
						titlePos.x,
						titlePos.y,
						"middle",
						o.title,
						taTitleFont,
						taTitleFontColor
					);
					if(labelType == "html"){
						this.htmlElements.push(axisTitle);
					}else{
						//as soon as rotation is provided, labelType won't be "html"
						//rotate gfx labels
						axisTitle.setTransform(g.matrix.rotategAt(titleRotation, titlePos.x, titlePos.y));
					}
				}
				
				// go out nicely instead of try/catch
				if(t==null){
					this.dirty = false;
					return this;
				}

				arr.forEach(t.major, function(tick){
					var offset = f(tick.value), elem,
						x = start.x + axisVector.x * offset,
						y = start.y + axisVector.y * offset;
						this.createLine(s, {
							x1: x, y1: y,
							x2: x + dx,
							y2: y + dy
						}).setStroke(taMajorTick);
						if(tick.label){
							var label = o.maxLabelCharCount ? this.getTextWithLimitCharCount(tick.label, taFont, o.maxLabelCharCount) : {
								text: tick.label,
								truncated: false
							};
							label = o.maxLabelSize ? this.getTextWithLimitLength(label.text, taFont, o.maxLabelSize, label.truncated) : label;
							elem = this.createText(labelType,
								s,
								x + dx + anchorOffset.x + (rotation ? 0 : labelOffset.x),
								y + dy + anchorOffset.y + (rotation ? 0 : labelOffset.y),
								labelAlign,
								label.text,
								taFont,
								taFontColor
								//this._cachedLabelWidth
							);
							
							// if bidi support was required, the textDir is "auto" and truncation
							// took place, we need to update the dir of the element for cases as: 
							// Fool label: 111111W (W for bidi character)
							// truncated label: 11... 
							// in this case for auto textDir the dir will be "ltr" which is wrong.
							if(this.chart.truncateBidi  && label.truncated){
								this.chart.truncateBidi(elem, tick.label, labelType);
							}
							label.truncated && this.labelTooltip(elem, this.chart, tick.label, label.text, taFont, labelType);
							if(labelType == "html"){
								this.htmlElements.push(elem);
							}else if(rotation){
								elem.setTransform([
									{dx: labelOffset.x, dy: labelOffset.y},
									g.matrix.rotategAt(
										rotation,
										x + dx + anchorOffset.x,
										y + dy + anchorOffset.y
									)
								]);
							}
						}
				}, this);

				dx = tickVector.x * taMinorTick.length;
				dy = tickVector.y * taMinorTick.length;
				canLabel = c.minMinorStep <= c.minor.tick * c.bounds.scale;
				arr.forEach(t.minor, function(tick){
					var offset = f(tick.value), elem,
						x = start.x + axisVector.x * offset,
						y = start.y + axisVector.y * offset;
						this.createLine(s, {
							x1: x, y1: y,
							x2: x + dx,
							y2: y + dy
						}).setStroke(taMinorTick);
						if(canLabel && tick.label){
							var label = o.maxLabelCharCount ? this.getTextWithLimitCharCount(tick.label, taFont, o.maxLabelCharCount) : {
								text: tick.label,
								truncated: false
							};
							label = o.maxLabelSize ? this.getTextWithLimitLength(label.text, taFont, o.maxLabelSize, label.truncated) : label;
							elem = this.createText(labelType,
								s,
								x + dx + anchorOffset.x + (rotation ? 0 : labelOffset.x),
								y + dy + anchorOffset.y + (rotation ? 0 : labelOffset.y),
								labelAlign,
								label.text,
								taFont,
								taFontColor
								//this._cachedLabelWidth
							);
							// if bidi support was required, the textDir is "auto" and truncation
							// took place, we need to update the dir of the element for cases as: 
							// Fool label: 111111W (W for bidi character)
							// truncated label: 11... 
							// in this case for auto textDir the dir will be "ltr" which is wrong.
							if(this.chart.getTextDir && label.truncated){
								this.chart.truncateBidi(elem, tick.label, labelType);
							}
							label.truncated && this.labelTooltip(elem, this.chart, tick.label, label.text, taFont, labelType);
							if(labelType == "html"){
								this.htmlElements.push(elem);
							}else if(rotation){
								elem.setTransform([
									{dx: labelOffset.x, dy: labelOffset.y},
									g.matrix.rotategAt(
										rotation,
										x + dx + anchorOffset.x,
										y + dy + anchorOffset.y
									)
								]);
							}
						}
				}, this);

				dx = tickVector.x * taMicroTick.length;
				dy = tickVector.y * taMicroTick.length;
				arr.forEach(t.micro, function(tick){
					var offset = f(tick.value), elem,
						x = start.x + axisVector.x * offset,
						y = start.y + axisVector.y * offset;
						this.createLine(s, {
							x1: x, y1: y,
							x2: x + dx,
							y2: y + dy
						}).setStroke(taMicroTick);
				}, this);
			}catch(e){
				// squelch
			}

			this.dirty = false;
			return this;	//	dojox.charting.axis2d.Default
		}