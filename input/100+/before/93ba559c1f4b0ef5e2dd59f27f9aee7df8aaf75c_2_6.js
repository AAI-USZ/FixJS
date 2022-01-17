function (context, args) {
          var graphingTool = Smartgraphs.graphingTool;
          var logicalPoint = graphingTool.pointForCoordinates(args.x, args.y, this);
          var bPointInGraph = graphingTool.checkInputAreaScreenBounds(args.x, args.y, this);
          if (!bPointInGraph || this.isPointInDatadef(logicalPoint.x, logicalPoint.y)) {
            this.rollbackPointDragged();
          }
          graphingTool.set('showTooltip', false);
          return;
        }