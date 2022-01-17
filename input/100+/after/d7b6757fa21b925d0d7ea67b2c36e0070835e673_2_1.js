function(id, duration) {
		// default duration
		if (duration == undefined)
			duration = 10000;
		
		var element = $('.group[data-group="' + id + '"]');
		if (element.length != 0) {
			
			$(".group").each(function() {
				if ($(this)[0] != element[0]) {
					$(this).animate({"width": "0%"});
				}
			});
			
			element.animate({"width": "100%"}, 400, function() {
				// trigger manual resize event
				element.find(".turtle").addClass("magnified").trigger("resize");
			});
		}
		
		if (duration != 0) {
			clearTimeout(Magnify.timer);
			Magnify.timer = setTimeout(Magnify.reset, duration);
		}
	}