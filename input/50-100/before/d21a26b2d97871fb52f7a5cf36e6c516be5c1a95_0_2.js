function(from) {
	while (from > 0 && (!this.getBlock(from) || this.scrollPos() < this.blockPosition(from))) {
		from -= 1;
	}
	var addingActivated;
	while (this.scrollPos() > this.blockPosition(from) + this.blockHeight()) {
		from += 1;
		addingActivated = true;
	}
	if(addingActivated) {
		from -= 1;
	}
	return from;
}