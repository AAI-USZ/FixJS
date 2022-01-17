function gotSharedViewModel(err, sharedModel) {
			res.render(thisPage.id, { shared: sharedModel, title: thisPage.title });
		}