f				if (!err) {
					//patch.save(function(err) {
					res.send('users/' + user._id);
				} else {
					res.send(500, 'Error #011: '+err);

				}
			});
