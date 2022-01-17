function (context, args) {
          var graphView = Smartgraphs.graphingTool.graphViewForPane(Smartgraphs.graphingTool.paneForState(this));
          var coords = graphView.graphCanvasView.axesView.inputAreaView.coordsForEvent({ pageX: args.x, pageY: args.y });
          var logicalPoint = graphView.pointForCoordinates(coords.x, coords.y);
          var graphingTool = Smartgraphs.graphingTool;
          var bPointInGraph = graphingTool.checkInputAreaScreenBounds(args.x, args.y, this);
          var bPointInDatadef = this.isPointInDatadef(logicalPoint.x, logicalPoint.y);
          if (!bPointInGraph || bPointInDatadef) {
            this.rollbackPointDragged();
          }
          graphingTool.set('showTooltip', false);
          return;
        }