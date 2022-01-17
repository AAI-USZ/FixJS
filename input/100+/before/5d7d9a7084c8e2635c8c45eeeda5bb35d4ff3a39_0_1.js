function(event) {
		var thisNodePath = [],
			thisCslId = parseInt($(event.target).attr("cslid"));

		$.each(nodePath, function (i, cslId) {
			thisNodePath.push(cslId);
			if (cslId === thisCslId) {
				return false;
			}
		});
		
		that.callbacks.selectNodeFromPath(thisNodePath);
	}