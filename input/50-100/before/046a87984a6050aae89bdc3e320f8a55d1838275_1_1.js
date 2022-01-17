function(err) {
			if (!err) {
				console.log("patch updated");
				res.send(req.url);
			} else {
				console.log("Error updating patch");
				res.send(404, req.url + " not found");
			}

		}