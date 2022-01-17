function(indicator, group, scale, startX, startY, endPosition, startThickness, endThickness, fill, stroke){
			// summary:
			//		Internal method.
			// tags:
			//		private
			var length = scale._contentBox.w ;
			var shape, i, gp, radius;
			
			if(this.ranges){
				// Configure gradient to represent the ranges
				fill = {type:"linear", colors:[]};
				fill.x1 = startX;
				fill.y1 = startY;
				fill.x2 = startX + length;
				fill.y2 = startY;
				
				var rangeStart = 0;
				
				for(i = 0; i < this.ranges.length; i++){
					var entry1 = {
						color:this.ranges[i].color,
						offset: scale.scaler.positionForValue(rangeStart)
					};
					var entry2 = {
						color:this.ranges[i].color,
						offset: scale.scaler.positionForValue(rangeStart+this.ranges[i].size)
					};
					fill.colors.push(entry1);
					fill.colors.push(entry2);
					rangeStart += this.ranges[i].size;
				}
			}else if(fill && fill.colors){
				// Configure gradient
				fill.x1 = startX;
				fill.y1 = startY;
				fill.x2 = startX + length;
				fill.y2 = startY;
			}
			
			var x = startX;
			var y = startY;
			var chicklet = (length / this.segments) - this.segmentSpacing;
			var visibleSegments = Math.abs( (endPosition - startX) / (chicklet+this.segmentSpacing) );
			var sw = this.startThickness;
			var inc = (this.endThickness - this.startThickness) /this.segments
			var ew = sw+inc;			
			var remain = visibleSegments - Math.floor(visibleSegments);
			
			for(i = 0; i < Math.floor(visibleSegments); i++){
				var path = group.createPath();
				
				if(i == 0 && this.rounded && (sw/2) < chicklet){ // first segment rounded
					radius = sw/2;
					path.moveTo(x + radius, y);
					path.lineTo(x + chicklet, y);
					path.lineTo(x + chicklet, y + ew);
					path.lineTo(x + radius, y + sw);
					path.arcTo(radius, radius, 0, 0, 1, x + radius, y)
				}else{
					if(i == Math.floor(visibleSegments) - 1 && (remain == 0) && this.rounded && (ew/2) < chicklet){ // last segment rounded
						radius = ew/2;
						path.moveTo(x, y);
						path.lineTo(x + chicklet - radius, y);
						path.arcTo(radius, radius, 0, 0, 1, x + chicklet - radius, y + ew)
						path.lineTo(x, y + sw);
						path.lineTo(x, y);
					}else{
						path.moveTo(x, y);
						path.lineTo(x + chicklet, y);
						path.lineTo(x + chicklet, y + ew);
						path.lineTo(x, y + sw);
						path.lineTo(x, y);
					}
				}
				
				path.setFill(fill).setStroke(stroke);
				sw = ew;
				ew += inc;
				x += chicklet + this.segmentSpacing;
			}
			
			// draw the remaining segment part
			if(remain > 0){
				ew = sw+( (ew-sw)*remain );
				gp = [x, y, x+(chicklet*remain), y, x+(chicklet*remain), y  + ew, x, y + sw, x, y]
				shape = group.createPolyline(gp).setFill(fill).setStroke(stroke);
			}
			
			return shape;
		}