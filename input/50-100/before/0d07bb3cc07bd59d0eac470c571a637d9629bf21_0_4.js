function () {
		this.container.removeClass('editing');
		this.model.set('text', this.inputNode.get('value')).save();
	}