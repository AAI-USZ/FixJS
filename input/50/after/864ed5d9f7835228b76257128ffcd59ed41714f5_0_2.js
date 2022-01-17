function () {
		if (this.isSet()) {
			return this.toXYZ().toRGBA();
		}
	}