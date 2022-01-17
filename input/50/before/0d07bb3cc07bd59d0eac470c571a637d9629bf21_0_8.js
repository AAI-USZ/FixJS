function (e) {
		e.preventDefault();

		this.constructor.superclass.remove.call(this);
		this.model.destroy({'delete': true});
	}