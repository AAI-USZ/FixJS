function (point1, point2, state) {
    var m, c, ptPlotted1, ptPlotted2, screenBounds, pointLogical1, pointLogical2;
    
    if (point1[0] > point2[0]) {
      var point3 = point2;
      point2 = point1;
      point1 = point3;
    }
    var pointLogicalBoundsArr = this.getLineEndPointsArray(point1, point2, state);
    var annotation = this.getAnnotation(this.get('annotationName'));
    annotation.addPoint(pointLogicalBoundsArr[0][0], pointLogicalBoundsArr[0][1]);
    annotation.addPoint(pointLogicalBoundsArr[1][0], pointLogicalBoundsArr[1][1]);
    this.set('lineCount', this.get('lineCount') + 1);
  }