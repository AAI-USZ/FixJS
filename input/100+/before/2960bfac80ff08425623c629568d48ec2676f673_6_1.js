function(x, y) {
	var res = getResolution();
	var w = res.w, h = res.h;
	var batchCmd;

	if(x == 'fit') {
		// Get bounding box
		var bbox = getStrokedBBox();
		
		if(bbox) {
			batchCmd = new BatchCommand("Fit Canvas to Content");
			var visEls = getVisibleElements();
			addToSelection(visEls);
			var dx = [], dy = [];
			$.each(visEls, function(i, item) {
				dx.push(bbox.x*-1);
				dy.push(bbox.y*-1);
			});
			
			var cmd = canvas.moveSelectedElements(dx, dy, true);
			batchCmd.addSubCommand(cmd);
			clearSelection();
			
			x = Math.round(bbox.width);
			y = Math.round(bbox.height);
		} else {
			return false;
		}
	}
	if (x != w || y != h) {
		var handle = svgroot.suspendRedraw(1000);
		if(!batchCmd) {
			batchCmd = new BatchCommand("Change Image Dimensions");
		}

		x = convertToNum('width', x);
		y = convertToNum('height', y);
		
		svgcontent.setAttribute('width', x);
		svgcontent.setAttribute('height', y);
		
		this.contentW = x;
		this.contentH = y;
		batchCmd.addSubCommand(new ChangeElementCommand(svgcontent, {"width":w, "height":h}));

		svgcontent.setAttribute("viewBox", [0, 0, x/current_zoom, y/current_zoom].join(' '));
		batchCmd.addSubCommand(new ChangeElementCommand(svgcontent, {"viewBox": ["0 0", w, h].join(' ')}));
	
		addCommandToHistory(batchCmd);
		svgroot.unsuspendRedraw(handle);
		background = document.getElementById("canvas_background");
	  if (background) {
	    background.setAttribute("x", -1)
	    background.setAttribute("y", -1)
	    background.setAttribute("width", x+1)
	    background.setAttribute("height", y+1)
	  }
		call("changed", [svgcontent]);
	}
	return true;
}