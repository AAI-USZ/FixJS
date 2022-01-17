function (context, args) {
					var points = this.getPath('toolRoot.annotation').get('points');
					if (Smartgraphs.graphingTool.get("lineCount") == 2)
					{
						this.get('owner').set('requestedCursorStyle', Smartgraphs.graphingTool.get('requestedCursorStyle'));
					}
				  this.get('owner').set('requestedCursorStyle', 'default');
					for (var i = 0; i < points.length; i++)
					{
						if (Math.round(args.x) == Math.round(points[i][0]) && Math.round(args.y) == Math.round(points[i][1], 2))
						{
							break;
						}
					}          
        }