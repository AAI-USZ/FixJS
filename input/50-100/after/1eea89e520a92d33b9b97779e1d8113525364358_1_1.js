function () {
		if (this.list.length > 1) {
			return this.list[0].toString() + this.list[1].toString();
		}

		return this.list[0].toString();
	}