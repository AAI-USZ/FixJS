function () {
		var container = this.container,
			model     = this.model,
			done      = model.get('done');

		container.setContent(Y.Lang.sub(this.template, {
			checked: done ? 'checked' : '',
			text   : model.getAsHTML('text')
		}));

		container[done ? 'addClass' : 'removeClass']('todo-done');
		this.inputNode = container.one('.todo-input');

		return this;
	}