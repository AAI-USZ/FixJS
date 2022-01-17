function(index) {
	if (!this.blokz) {
		this.blokz = $(".block", this.contentScrolled());		
	}
	return this.blokz.get(index);
}