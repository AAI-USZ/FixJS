function() {
		this.invalidatePages();
		this.update(this.getScrollTop());
		this.stabilize();
	}