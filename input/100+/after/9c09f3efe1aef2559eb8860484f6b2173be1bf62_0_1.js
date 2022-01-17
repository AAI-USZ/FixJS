function(req, res) {
	console.log(req.body);

	var models = state.ItemList.models;

	var existingModel = null;
	models.every(function(model) {
		if (model.id == req.body.id) {
			existingModel = model;
			return false;
		}

		return true;
	});

	if (existingModel == null) {
		models.unshift(req.body);
		bayClient.publish('/ItemList/' + req.params.id, {model: req.body});
	} else {
		_.extend(
		existingModel, 
		req.body);

		bayClient.publish('/ItemList/' + req.params.id, {model: req.body});
	}

	res.send();
}