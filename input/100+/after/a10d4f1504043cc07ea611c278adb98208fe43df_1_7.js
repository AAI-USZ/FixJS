function () {
          var graphingTool = Smartgraphs.graphingTool;
          var info = this.pointDraggedInfo;
          var pointMovedNumber = graphingTool.get('pointMovedNumber');
          info.datadefPoints.replace(pointMovedNumber, 1, [[info.initialPoint.x, info.initialPoint.y]]);
          if (info.datadefPoints.length >= 2) {
            var pointLogicalArray = graphingTool.getLineEndPointsArray(info.datadefPoints[0], info.datadefPoints[1]);
            info.annotationPoints.replace(0, 2, pointLogicalArray);
          }
        }