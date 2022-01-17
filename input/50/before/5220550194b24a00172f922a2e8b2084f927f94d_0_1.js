function (event) {
		event.preventDefault();
		if ($(event.target).closest('div.colorpicker').length === 0) {
			this.close();
		}
	}