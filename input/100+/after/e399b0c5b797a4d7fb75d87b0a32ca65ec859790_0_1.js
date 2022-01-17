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
					req.session.runs = 0;
				} else if (view.asset.service == 'vimeo') {
					res.render('vimeoplayer', view);
					req.session.runs = 0;
				} else {
					if (req.session.total != 0) {
						// This gives an infinite loop when a collection doesn't have a video
						//getAssetFromCollection(res, req, view);
						if(!req.session.runs) {
							req.session.runs = 0;
						}

						if (req.session.runs < 5) {
							req.session.runs++;
							console.log('were in there now and the count is: ' + req.session.runs); 
							getAssetFromCollection(res, req, view);
						} else {
						view = {title: 'Whoops', error: 'We couldn\'t find any videos in here. Try another collection.'};
						res.render('error', view);
						req.session.runs = 0;
						}
					} else {
						view = {title: 'Huh', error: 'There\' no videos in here it seems.'};
						res.render('error', view);
						req.session.runs = 0;
					}
				}
			}
		}
	}