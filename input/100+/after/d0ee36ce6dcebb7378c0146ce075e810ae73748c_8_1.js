function(visible) {
		var treePane = this.treePane;
		// before removing pane, remember position of contentPane when show/hide treePane to restore layout
		cpPosition = geometry.position(this.contentPane.domNode);
		visible === false  ? this.removeChild(treePane) : this.addChild(treePane);
		this._set('treePaneVisible', visible);
	}