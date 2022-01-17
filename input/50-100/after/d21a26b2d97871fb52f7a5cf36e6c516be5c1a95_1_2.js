function() {
	if (!this.main) {
		this.main=$("#" + this.id);
		if (this.main.size() > 0) {
			this.contentArea=$("#" + this.contentId, this.main);
		} else {
			this.generateMarkup();
		}
	}
}