function (event, target) {
		event.stopEvent();
		this.restoreSelection();
		var entity = Ext.get(target).dom.innerHTML;
		this.insertEntity(entity);
		this.saveSelection();
		return false;
	}