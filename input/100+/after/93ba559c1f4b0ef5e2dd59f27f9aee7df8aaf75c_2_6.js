function (context, args) {
          var graphingTool = Smartgraphs.graphingTool;
          graphingTool.set('showTooltip', false);
          var bPointInGraph = graphingTool.checkInputAreaScreenBounds(args.x, args.y, this);
          if (bPointInGraph)
          {
            var curPoint = graphingTool.pointForCoordinates(args.x, args.y, this);
            var bPointInDatadef = this.isPointInDatadef(curPoint.x, curPoint.y);
            if (!bPointInDatadef) {
              var curPointFixed = Smartgraphs.Point.create({x: curPoint.x, y: curPoint.y});
              var initialPoint = this.pointDraggedInfo.initialPoint;
              if (initialPoint.xFixed() !== curPointFixed.xFixed() ||
                  initialPoint.yFixed() !== curPointFixed.yFixed())
              {
                graphingTool.set('pointMoved', true);
              }
              return;
            }
          }
          this.rollbackPointDragged();
          return;
        }