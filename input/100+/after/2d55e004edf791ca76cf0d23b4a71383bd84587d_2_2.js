function(id) {
		// stop timer
		Switcher.stop();
		
		var turtle = $(".turtle#" + id);
		
		if (turtle.length == 0)
			return false;
		
		var group = turtle.parent();
		var orbs = group.find("ol");
		var index = group.find(turtle).index();
		
		// change orb
		orbs.find("li").removeClass("active");
		orbs.find("li").eq(index - 1).addClass("active");
		
		// change turtle
		group.find(".turtle").removeClass("active").hide().trigger("hide");
		turtle.show().trigger("show");
		
		// start timer
		Switcher.start();
	}