function $_prototype_quickClone (deep) {
		return this.map(function quickClone_internal (elem, deep) {
			return this.cloneNode(deep || false);
		});
	}