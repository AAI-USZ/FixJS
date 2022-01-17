function() {
		console.log('Rendering ' + this.name, this);
		this._createDom();
		$(this.el).trigger('jui-pagerendered');
	}