function (entity, callback, ctx) {
	if (!entity.stored) {
		throw new Error('Cannot remove an unsaved entity');
	}

	var selector = {
		'_id': entity.id
	};

	this.collection_.remove(selector, callback, ctx);
}