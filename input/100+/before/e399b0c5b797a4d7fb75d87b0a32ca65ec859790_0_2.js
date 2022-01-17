function (err, data) {
		if (!err) {			
			if (data.errors && data.errors[0].name === 'RESOURCE_NOT_FOUND') {
				res.render('404', view = {title: 'error', error: 'Ressource not found'});
			} else {
				if (!req.session.username) { // first run
					req.session.username = view.username;
				 	req.session.total = data.total_records;
				} else if (req.session.username != view.username ) { // different user
					req.session.username = view.username;
				 	req.session.total = data.total_records;
				} else if (req.session.total != data.total_records) {
					req.session.username = view.username;
					req.session.total = data.total_records;	
				}

				view.asset = getAssetParams(res, data.records[0]);
				view.updateLocation = true;
				if (view.asset.service == 'youtube') {
					res.render('youtubeplayer', view);
				} else if (view.asset.service == 'vimeo') {
					res.render('vimeoplayer', view);
				} else {
					//view = {title: 'Yikes', error: 'Service isnt known. TODO: Get a new asset.'};
					//res.render('error', view);
					if (req.session.total != 0) {
						getRandomAsset(res, req, view);
					} else {
						view = {title: 'Yikes', error: 'This guy has no collections. (getRandomAsset)'};
						res.render('error', view);
					}
				}
				//Need to set the URL appropriately after rendering the view
				//setPathAndQuery(req, view);
			}
		}
	}