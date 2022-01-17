function(err) {
			if (!err) {
				console.log("user updated");
				res.send(req.url);
			} else {
				console.log(err);
				console.log("Error updating user");
				res.send(404, req.url + " not found");
			}

		}