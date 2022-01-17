function(error, model) {
			if (error) throw error;
			res.render('reading', model);
		}