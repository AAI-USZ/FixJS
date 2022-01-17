function () {
          var graphingTool = Smartgraphs.graphingTool;
          var info = this.pointDraggedInfo;
          var pointSelected = graphingTool.get('pointSelectedInArray');
          info.datadefPoints.replace(pointSelected, 1, [[info.initialPointSelected.x, info.initialPointSelected.y]]);
          if (info.datadefPoints.length >= 2) {
            var pointLogicalArray = graphingTool.getLineEndPointsArray(info.datadefPoints[0], info.datadefPoints[1], this);
            info.annotationPoints.replace(0, 2, pointLogicalArray);
          }
        }