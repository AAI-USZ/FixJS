function (target) {
		this.showContextItems(target);
		if (!HTMLArea.isIEBeforeIE9) {
			this.ranges = this.editor.getSelection().getRanges();
		}
		var iframeEl = this.editor.iframe.getEl();
			// Show the context menu
		this.menu.showAt([Ext.fly(target).getX() + iframeEl.getX(), Ext.fly(target).getY() + iframeEl.getY()]);
	}