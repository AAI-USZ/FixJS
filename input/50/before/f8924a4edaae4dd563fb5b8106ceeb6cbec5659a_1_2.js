function(element, time) {
		this.iscroll.refresh();
		this.iscroll.scrollToElement(document.id(element), time || 0);
		return this;
	}