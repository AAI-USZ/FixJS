function (context, args) {
          var graphingTool = Smartgraphs.graphingTool;
          var datadef = this.getPath('toolRoot.datadef');
          var datadefPoints = datadef.get("points");
          if (datadefPoints.length < 2) {
            graphingTool.plotPoint(Smartgraphs.Point.create({ x: args.x, y: args.y }));
            if (datadefPoints.length === 2) {
              graphingTool.drawLineThroughPoints(datadefPoints[0], datadefPoints[1], this);
              graphingTool.graphingFinished(this);
            }
          }
        }