function(err, event) {
	if (err) {
	    next();
	}
        res.render("schedule/event-admin", {locals: {title: "Update " + event.name, event: event, places: places, timezone_offset: parseInt(config.schedule.timezone_offset, 10)}});
    }