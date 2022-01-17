function() {
	this.blokz = undefined;
	if (!this.getBlock(1)) return;
	for (blockIndex = this.getFirstVisibleBlock(); this.blockPosition(blockIndex) < this.scrollPos() + this.viewHeight() ; blockIndex++) {
		block = this.getBlock(blockIndex);
		placeholder = $(".loader-placeholder", $(block)).get(0);
		if (placeholder) {
			placeholder.onclick();
		}
	}
}