function(id, duration) {
		// default duration
		if (duration == undefined)
			duration = 10000;
		
		var element = $(".turtle#" + id);
		var parent = element.parent;

		if (element.length != 0) {
			var parent = element.parent();
			
			// switch to turtle
			Switcher.to(id);
			
			$(".group").each(function() {
				if ($(this)[0] == parent[0])
					parent.animate({"width": "100%"});
				else
					$(this).animate({"width": "0%"});
			});
			
			setTimeout(Magnify.reset, duration);
		}
	}