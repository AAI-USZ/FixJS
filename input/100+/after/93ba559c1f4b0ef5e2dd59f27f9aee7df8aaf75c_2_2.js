function (context, args) {
          var curPoint = args;
          var datadefPoints = this.getPath('toolRoot.datadef').get('points');
          var annotationPoints = this.getPath('toolRoot.annotation').get('points');
          for (var i = 0 ; i < datadefPoints.length; i++) {
            if ((curPoint.x === datadefPoints[i][0]) && (curPoint.y === datadefPoints[i][1])) {
              Smartgraphs.graphingTool.set('pointMovedNumber', i);
              break;
            }
          }
          Smartgraphs.graphingTool.set('showTooltip', true);
          this.pointDraggedInfo.datadefPoints = datadefPoints;
          this.pointDraggedInfo.annotationPoints = annotationPoints;
          return;
        }