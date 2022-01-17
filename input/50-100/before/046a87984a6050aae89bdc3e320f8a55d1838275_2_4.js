f		if (!err) {
			user.patches.push({
				claimed: req.params.claimed,
				patch: req.params.patch,
				timestamp: new Date()
			});
			user.save(function(err) {
				if (!err) {
					//patch.save(function(err) {
					res.send('users/' + user._id);
				} else {
					res.send(err);

				}
			});
		} else res.send(404, req.url + " not found");
	});
