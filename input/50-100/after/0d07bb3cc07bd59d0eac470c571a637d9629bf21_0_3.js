function () {
		var container = this.container,
			model = this.model,
			completed = model.get('completed');

		container.setContent( Y.Lang.sub( this.template, {
			completed: completed ? 'checked' : '',
			title: model.get('title')
		}));

		container[ completed ? 'addClass' : 'removeClass' ]('completed');
		this.inputNode = container.one('.edit');

		return this;
	}