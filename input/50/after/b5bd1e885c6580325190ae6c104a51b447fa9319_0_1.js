function gotSharedViewModel(err, sharedModel) {
			res.render(sharedModel.pageTemplateName, sharedModel);
		}