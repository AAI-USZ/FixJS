function() {
		this.socket();
		this.bind("change:tags", this.update_tags, this);
	}