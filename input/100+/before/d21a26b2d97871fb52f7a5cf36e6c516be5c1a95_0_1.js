function() {
	this.blokz = undefined;
	if (!this.getBlock(1)) return;
	for (blockIndex = this.getFirstVisibleBlock(); this.blockPosition(blockIndex) < this.scrollPos() + this.viewHeight() ; blockIndex++) {
		/** Too slow for big scrollings, speed up. */
		if(this.blockPosition(blockIndex + 1) && this.blockPosition(blockIndex + 1) < this.scrollPos() + this.viewHeight()) {
			continue;
		}
		block = this.getBlock(blockIndex);
		placeholder = (function($) { 
				return $(".loader-placeholder", $(block)).get(0); 
			})(jQuery);
		if (placeholder) {
			placeholder.onclick();
		}
	}
}