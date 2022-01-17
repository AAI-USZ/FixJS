function(err, event) {
	if (err) {
	    next();
	}
      // only admin && event proposers can update
      if (req.user.login !== event.proposedBy.login) {
        var isAdmin = new RegExp("^" + config.admin.login.replace(",","|") + "$");
        if (!isAdmin.test(req.user.login)) {
	  return res.render("403");
        }    
      }

      res.render("schedule/event-admin", {locals: {title: "Update " + event.name, event: event, places: places, timezone_offset: parseInt(config.schedule.timezone_offset, 10)}});
    }