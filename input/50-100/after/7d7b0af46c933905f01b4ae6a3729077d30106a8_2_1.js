function (evt) {
		      var coords = this.coordsForEvent(evt),
		          point = this._graphView.pointForCoordinates(coords.x, coords.y);
		
					var graphController = this._graphView.get('graphController');
		      return graphController.inputAreaMouseDragged(point.x, point.y);
		    }