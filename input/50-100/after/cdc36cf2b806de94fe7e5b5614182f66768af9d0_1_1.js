function(id, duration) {
		// default duration
		if (duration == undefined)
			duration = 10000;
		
		var element = $(".turtle#" + id);

		if (element.length != 0) {
			var parent = element.parent();
			
			// switch to turtle
			Switcher.to(id);
			
			// magnify turtle
			Magnify.group(parent.attr("data-group"), duration);
		}
	}