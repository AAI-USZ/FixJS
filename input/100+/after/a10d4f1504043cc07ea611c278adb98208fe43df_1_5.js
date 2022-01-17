function (xCur, yCur) {
          var graphingTool = Smartgraphs.graphingTool;
          var info = this.pointDraggedInfo;
          var pointMovedNumber = graphingTool.get('pointMovedNumber');
          for (var i = 0 ; i < info.datadefPoints.length; i++) {
            if (i === pointMovedNumber) {
              continue;
            }
            var point = info.datadefPoints[i];
            if (point[0] === xCur && point[1] === yCur) {
              graphingTool.set('showTooltip', false);
              return true;
            }
            return false;
          }
        }