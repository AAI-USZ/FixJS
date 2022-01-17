function (context, args) {
          var graphingTool = Smartgraphs.graphingTool;
          if (this.isPointInDatadef(args.x, args.y)) {
            graphingTool.set('showTooltip', false);
          }
          else {
            graphingTool.set('showTooltip', true);
          }
          var info = this.pointDraggedInfo;
          var pointMovedNumber = graphingTool.get('pointMovedNumber');
          info.datadefPoints.replace(pointMovedNumber, 1, [[args.x, args.y]]);
          if (info.datadefPoints.length >= 2) {
            var pointLogicalArray = graphingTool.getLineEndPointsArray(info.datadefPoints[0], info.datadefPoints[1]);
            info.annotationPoints.replace(0, 2, pointLogicalArray);
          }
          return;
        }