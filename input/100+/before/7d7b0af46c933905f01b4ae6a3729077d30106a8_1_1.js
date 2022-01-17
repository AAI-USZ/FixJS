function (point1, point2, state) {
    var m, c, ptPlotted1, ptPlotted2, screenBounds, pointLogical1, pointLogical2;
    
    if (point1[0] > point2[0]) {
			var point3 = point2;
			point2 = point1;
			point1 = point3;
    }
    
    screenBounds = this.graphViewFromState(state).graphCanvasView._getLogicalBounds();
    
    pointLogical1 = [];
    pointLogical2 = [];
    
    if ((point2[0] === point1[0])) {
			pointLogical1 = [point1[0], screenBounds.yMin];
			pointLogical2 = [point1[0], screenBounds.yMax];
    } else {
			m = (point2[1] - point1[1]) / (point2[0] - point1[0]);
			c = point2[1] - m * point2[0];
			
			if (m === 0) {
				pointLogical1 = [screenBounds.xMin, point1[1]];
				pointLogical2 = [screenBounds.xMax, point1[1]];
			} else {
				pointLogical1[0] = screenBounds.xMin;
				pointLogical1[1] = m * pointLogical1[0] + c;
				
				pointLogical1 = this.getLinePointWithinLogicalBounds(pointLogical1, m, c, screenBounds);
				
				pointLogical2[1] = m > 0 ? screenBounds.yMax : screenBounds.yMin;
				pointLogical2[0] = (pointLogical2[1] - c) / m;
									
				pointLogical2 = this.getLinePointWithinLogicalBounds(pointLogical2, m, c, screenBounds);
			}
    }
		
		this.getAnnotation(this.get('annotationName')).addPoint(pointLogical1[0], pointLogical1[1]);
		this.getAnnotation(this.get('annotationName')).addPoint(pointLogical2[0], pointLogical2[1]);
		
		this.set('lineCount', this.get('lineCount' + 1));
  }