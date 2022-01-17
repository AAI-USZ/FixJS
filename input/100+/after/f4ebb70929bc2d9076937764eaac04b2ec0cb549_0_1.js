function HSV(hue, saturation, value) {
		if (Type.isNumber(hue) && Type.isNumber(saturation) && Type.isNumber(value)) {
			this.hue = hue;
			this.saturation = saturation;
			this.value = value;
		} else if (Type.isObject(hue)) {
			if (hue instanceof this.constructor) {
				this.hue = hue.hue;
				this.saturation = hue.saturation;
				this.value = hue.value;
			} else {
				return toHSV(hue);
			}
		} else {
			return toHSV(hue);
		}
	}