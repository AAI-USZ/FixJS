function(position) {
		if (position < this.minimum || position > this.maximum) {
			throw 'The track ranges from ' + this.minimum + ' to ' + this.maximum + '.';
		}

		return this.rank[position - this.minimum];
	}