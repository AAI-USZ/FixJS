function () {
		return Y.Array.filter(this.toArray(), function (model) {
			return !model.get('done');
		});
	}