function (event, target) {
		event.stopEvent();
		this.restoreSelection();
		var icon = Ext.get(target).first();
		var imgTag = this.editor.document.createElement('img');
		imgTag.setAttribute('src', icon.getAttribute('src'));
		imgTag.setAttribute('alt', target.getAttribute('ext:qtitle'));
		imgTag.setAttribute('title', target.getAttribute('ext:qtip'));
		this.editor.getSelection().insertNode(imgTag);
		if (!HTMLArea.isIEBeforeIE9) {
			this.editor.getSelection().selectNode(imgTag, false);
		}
		this.close();
		return false;
	}