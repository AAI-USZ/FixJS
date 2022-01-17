function (event) {
		// event.preventDefault();
		if (event.target === this.$wrapperDiv[0]) {
			this.close();
		}
	}