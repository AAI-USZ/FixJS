function() {
		this.innerWrapperElement.addEvent('scroll', this.bound('_onScroll'));
		return this;
	}