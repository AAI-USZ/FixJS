function(err) {
				emitter.emit("newtwitteraccount", indiv);
				// re-start twitter listener
				emitter.emit("twitterListChange", id);
				if (!err) {
				    req.flash("success", "Successfully added your twitter account");
				} else {
				    req.flash("error", "Failed to add your twitter account: " + err);
				}
				next();
			    }