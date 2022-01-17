function (err, data) {
		if (!err) {
			if (data.errors && data.errors[0].name === "RESOURCE_NOT_FOUND") {
				res.render('404', view = {title: 'Error', error: 'Ressource not found'});
			} else {
				if (!req.session.username || !req.session.collection_slug) {
					req.session.username = view.username;
					req.session.collection_slug = view.collection_slug;
					req.session.total = data.total_records;
				} else if (req.session.username != view.username || req.session.collection_slug != view.username || req.session.total != data.total_records) {
					req.session.username = view.username;
					req.session.collection_slug = view.collection_slug;
					req.session.total = data.total_records;
				}

				view.asset = getAssetParams(req, data.records[0]);
				if (view.asset.service == 'youtube') {
					res.render('youtubeplayer', view);
				} else if (view.asset.service == 'vimeo') {
					res.render('vimeoplayer', view);
				} else {
					if (req.session.total != 0) {
						// This gives an infinite loop when a collection doesn't have a video
						//getAssetFromCollection(res, req, view);
						
						view = {title: 'Yikes', error: 'Unknown asset type.'};
						res.render('error', view);
					} else {
						view = {title: 'Yikes', error: 'No videos in here. Maybe try another collection'};
						res.render('error', view);
					}
				}
			}
		}
	}