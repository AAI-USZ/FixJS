function (context, args) {
          var graphingTool = Smartgraphs.graphingTool;
          var curPoint = args;
          var datadefPoints = this.getPath('toolRoot.datadef').get('points');
          var annotationPoints = this.getPath('toolRoot.annotation').get('points');
          for (var i = 0 ; i < datadefPoints.length; i++) {
            if ((curPoint.x === datadefPoints[i][0]) && (curPoint.y === datadefPoints[i][1])) {
              graphingTool.set('pointMovedNumber', i);
              break;
            }
          }
          graphingTool.set('showTooltip', true);
          this.pointDraggedInfo.datadefPoints = datadefPoints;
          this.pointDraggedInfo.annotationPoints = annotationPoints;
          this.pointDraggedInfo.initialPoint = Smartgraphs.Point.create({x: curPoint.x, y: curPoint.y});
          return;
        }