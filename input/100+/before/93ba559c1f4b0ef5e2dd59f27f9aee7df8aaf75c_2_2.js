function (context, args) {
          var pointSelected = args;
          var datadefPoints = this.getPath('toolRoot.datadef').get('points');
          var annotationPoints = this.getPath('toolRoot.annotation').get('points');
          for (var i = 0 ; i < datadefPoints.length; i++) {
            if ((pointSelected.x == datadefPoints[i][0]) && (pointSelected.y == datadefPoints[i][1])) {
              Smartgraphs.graphingTool.set('pointSelectedInArray', i);
              break;
            }
          }
          Smartgraphs.graphingTool.set('showTooltip', true);
          this.pointDraggedInfo = {
            datadefPoints: datadefPoints,
            annotationPoints: annotationPoints,
            initialPointSelected: pointSelected
          };
          return;
        }