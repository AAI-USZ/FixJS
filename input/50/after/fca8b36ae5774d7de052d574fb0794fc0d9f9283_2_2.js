function(req, res) {
		res.render('twitter', { title: 'Twitter', shared: shared.getSharedViewModel('twitter') });
	}