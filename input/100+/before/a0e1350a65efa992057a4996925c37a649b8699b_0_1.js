function RGB(red, green, blue) {
		if (red !== undefined && ((green === undefined && blue === undefined) || (Type.isNumber(green) && Type.isNumber(blue) && green.between(0, 255) && blue.between(0, 255)))) {
			if (green === undefined) {
				if (Type.isObject(red) && red instanceof this.constructor) {
					this.red = red.red;
					this.green = red.green;
					this.blue = red.blue;
				} else if (Type.isString(red)) {
					var parts = Color.regex.RGB.exec(red);

					if (parts) {
						parts[1] = Math.round(parts[1]);
						parts[2] = Math.round(parts[2]);
						parts[3] = Math.round(parts[3]);

						if (parts[1].between(0, 255) && parts[2].between(0, 255) && parts[3].between(0, 255)) {
							this.red = parts[1];
							this.green = parts[2];
							this.blue = parts[3];
						}
					}
				} else {
					return toRGB(red);
				}
			} else if (Type.isNumber(red) && red.between(0, 255)) {
				this.red = red;
				this.green = green;
				this.blue = blue;
			}
		}
	}