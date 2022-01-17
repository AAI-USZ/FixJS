function (data_extent) {
		if (typeof(data_extent) != "object") {
			throw new Error("we miss a data_extent");
		}
		this.data_extent = data_extent;
		// store reference back
		this.data_extent.canvas = this;
	}