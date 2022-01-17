function(e, el) {
		e && e.stop && e.stop();
		var id = el.getParent('div.task').get('data-id'),
			model = this.collection.getModelById(id);

		this.collection.removeModel(model);
		model.delete();
		this.render();
	}