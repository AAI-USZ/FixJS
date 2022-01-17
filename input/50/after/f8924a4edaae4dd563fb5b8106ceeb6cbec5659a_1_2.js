function(element, time) {
		this._moving = true;
		this.iscroll.scrollToElement(document.id(element), time || 0);
		return this;
	}