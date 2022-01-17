function (evt) {
          var coords = this.coordsForEvent(evt),
              point = this._graphView.pointForCoordinates(coords.x, coords.y);
					
					var bounds = this.get("graphView").get("graphCanvasView")._getScreenBounds();
					
					var layout = this._graphView.get('graphController').get("tooltipLayout");
					if (coords.x + layout.width >= bounds.xRight)
					{
						coords.x = bounds.xRight - layout.width;
					}
					
          var graphController = this._graphView.get('graphController');
          if (graphController.showToolTipCoords)
          {
						graphController.updateToolTip(point, coords);
          }
          else
          {
						graphController.hideToolTip();
          }
          return graphController.inputAreaMouseMove(point.x, point.y);
        }