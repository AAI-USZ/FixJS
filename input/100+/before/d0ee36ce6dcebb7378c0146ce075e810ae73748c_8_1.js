function(visible) {
		var treePane = this.treePane;
		// before removing pane, remember position of contentPane when show/hide treePane to restore layout
		cpPosition = geometry.position(this.contentPane.domNode);
		cpWith = style.get(this.contentPane.domNode, 'width');
		cpHeight = style.get(this.contentPane.domNode, 'height');
		cpLeft = style.get(this.contentPane.domNode, 'left');
		cpTop = style.get(this.contentPane.domNode, 'top');

		visible === false  ? this.removeChild(treePane) : this.addChild(treePane);

		this._set('treePaneVisible', visible);
	}