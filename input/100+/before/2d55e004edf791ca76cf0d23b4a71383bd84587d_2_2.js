function(id) {
		// stop timer
		Switcher.stop();
		
		var turtle = $(root).find(".turtle#" + id);
		
		if (turtle.length == 0)
			return false;
		
		var group = turtle.parent(".group");
		var orbs = group.find("ol");
		var index = group.find(turtle).index();
		
		// change orb
		orbs.find("li").removeClass("active");
		orbs.find("li").eq(index - 1).addClass("active");
		
		// change turtle
		group.find(".turtle").removeClass("active").hide().trigger("hide");
		group.find(".turtle").eq(index - 1).addClass("active").show().trigger("show");
		
		// start timer
		Switcher.start();
	}