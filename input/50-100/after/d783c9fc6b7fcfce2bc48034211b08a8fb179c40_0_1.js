function(from) {
	while (from > 0 && (!this.getBlock(from) || this.scrollPos() < this.blockPosition(from))) {
		from -= 1;
	}
	while (this.scrollPos() > this.blockPosition(from) + this.blockHeight()) {
		from += 1;
	}
	return from;
}