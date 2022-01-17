function(realWorldCoords) {
		var log = (TissueStack.desktop || TissueStack.tablet) ? $('#canvas_extent') : $('#canvas_' + this.getDataExtent().plane + '_extent');
		if(TissueStack.phone){
			log.html("Zoom Level: " + this.getDataExtent().zoom_level);

		} else {
			log.html(
					"Zoom Level: " + this.getDataExtent().zoom_level +
					"<br/><hr />X: " + realWorldCoords.min_x + " to " + realWorldCoords.max_x + "<br/>Y: "
					+ realWorldCoords.min_y + " to " + realWorldCoords.max_y + "<br/>Z: "
					+ realWorldCoords.min_z + " to " + realWorldCoords.max_z + "<br /><hr />");
		}
	}