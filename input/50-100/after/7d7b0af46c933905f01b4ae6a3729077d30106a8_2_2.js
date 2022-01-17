function (evt) {
		      var coords = this.coordsForEvent(evt),
		          point = this._graphView.pointForCoordinates(coords.x, coords.y);
					
					this._graphController = this._graphView.get('graphController');
		      return this._graphController.inputAreaMouseUp(point.x, point.y);
		    }