function gotTagViewModel(error, model) {
			if (error) throw error;
			res.render('reading_tag', model);
		}