function(req, res, next) {
    if (! req.loggedIn) {
      return res.redirect(everyauth.password.getLoginPath());
    }
    var isAdmin = new RegExp("^" + config.admin.login.replace(",","|") + "$");
    if (!isAdmin.test(req.user.login)) {
	return res.render("403");
    }    
    Event.findOne({slug: req.params.slug}, function(err, event) {
      if (err) {
	 next();
      }
      if (req.body.updateEvent !== undefined){
      if (!req.body.name){
	  req.flash("error", "Missing event name");
	  next();
      } else if (!req.body.day) {
	  req.flash("error", "Missing event day");
	  next();
      } else if (!req.body.start) {
	  req.flash("error", "Missing event start time");
	  next();
      } else if (!req.body.end) {
	  req.flash("error", "Missing event end time");
	  next();
      }
      var room = places[req.body.room];
	  if (!room) {
	      req.flash("error", "No known room with shortname" + req.body.room);
	  }
	  event.timeStart =  parseDate(req.body.day.replace(/-/g,'') + 'T' + String('0000'  + (parseInt(req.body.start.replace(":",""), 10) - 100* parseInt(config.schedule.timezone_offset, 10))).slice(-4) + '00');
	  event.timeEnd =  parseDate(req.body.day.replace(/-/g,'') + 'T' + String('0000' + (parseInt(req.body.end.replace(":",""), 10) - 100 * parseInt(config.schedule.timezone_offset, 10))).slice(-4) + '00');
	  event.name= req.body.name;
	  event.presenters= req.body.presenters;
	  event.confidentiality = req.body.confidentiality;
	  event.observers = req.body.observers;
	  event.room = room._id;
          event.save(function (err) {
            if (err) {
		req.flash('error',err);
	    } else {
		req.flash('success', req.body.name + ' successfully updated')	 ;
	    }
	    next();
          });
      } else if (req.body.deleteEvent !== undefined) {
	  if (!req.body.confirm){
	      req.flash("error", "If you really want to delete the event, you need to confirm so by checking the checkbox");
	      next();
	  }
	  event.remove(
	      function(err) {
		  if (err) {
		      req.flash("error", err);
		      next();
		  } else {
		      req.flash("success", "Event successfully deleted");
		      return res.redirect(config.hosting.basepath + '/schedule/admin');
		  }
	      });
      }
   });
}