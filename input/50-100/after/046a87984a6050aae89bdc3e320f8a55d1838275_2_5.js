f		if (!err) {
			user.patches = [];
			user.save(function(err) {
				if (!err) {
					//patch.save(function(err) {
					res.send('/users/' + user._id);
				} else {
					res.send(500, 'Error #013: '+err);

				}
			});
		} else res.send(500, 'Error #014: '+err);
	});
