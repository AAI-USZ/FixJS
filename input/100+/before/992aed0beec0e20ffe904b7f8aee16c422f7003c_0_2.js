function (context, args) {
          var graphingTool = Smartgraphs.graphingTool;
          var bPointInGraph = graphingTool.checkInputAreaScreenBounds(args.x, args.y, this);
          if (!bPointInGraph) {
            this.rollbackPointDragged();
          }
          //graphingTool.set('showTooltip', false);
          return;
        }