function gotSharedViewModel(error, model) {
			res.render('twitter', { title: 'Twitter', shared: model });
		}