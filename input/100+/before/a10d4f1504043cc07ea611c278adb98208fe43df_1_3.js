function (context, args) {
          var datadef = this.getPath('toolRoot.datadef');
          var datadefPoints = datadef.get("points");
          if (datadefPoints.length < 2) {
            Smartgraphs.graphingTool.plotPoint(Smartgraphs.Point.create({ x: args.x, y: args.y }));
            if (datadefPoints.length === 2) {
              Smartgraphs.graphingTool.drawLineThroughPoints(datadefPoints[0], datadefPoints[1], this);
              Smartgraphs.graphingTool.graphingFinished(this);
            }
          }
        }