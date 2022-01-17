function (evt) {
		      var coords = this.coordsForEvent(evt),
		          point = this._graphView.pointForCoordinates(coords.x, coords.y);
		
		      return this._graphController.inputAreaMouseDragged(point.x, point.y);
		    }