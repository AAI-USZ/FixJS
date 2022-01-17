function (xCur, yCur) {
          var info = this.pointDraggedInfo;
          var pointMovedNumber = Smartgraphs.graphingTool.get('pointMovedNumber');
          for (var i = 0 ; i < info.datadefPoints.length; i ++) {
            if (i === pointMovedNumber) {
              continue;
            }
            var point = info.datadefPoints[i];
            if (point[0] === xCur && point[1] === yCur) {
              Smartgraphs.graphingTool.set('showTooltip', false);
              return true;
            }
            return false;
          }
        }