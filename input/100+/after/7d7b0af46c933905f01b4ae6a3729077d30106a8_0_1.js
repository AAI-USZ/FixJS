function (context, args) {
					var datadef = this.getPath('toolRoot.datadef');   
					if (datadef.get("points").length < 2)
					{
						Smartgraphs.graphingTool.plotPoint(args.x, args.y);
						
						if (datadef.get("points").length == 2)
						{
							Smartgraphs.graphingTool.drawLineThroughPoints(datadef.get("points")[0], [args.x, args.y], this);
							Smartgraphs.graphingTool.set('requestedCursorStyle', this.get('owner').get('requestedCursorStyle'));
							this.get('owner').set('requestedCursorStyle', 'default');
							Smartgraphs.graphingTool.set('showTooltip', false);
							this.get('owner').hideToolTip();
						}
					}
        }