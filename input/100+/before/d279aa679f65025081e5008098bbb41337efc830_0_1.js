function (horizontalLength, verticalLength, blurRadius, color) {
		if (horizontalLength && verticalLength) {
			var value = [];

			if (!horizontalLength) {
				horizontalLength = 0;
			} else if (Type.isNumber(horizontalLength)) {
				horizontalLength += 'px';
			}

			value.push(horizontalLength);

			if (!verticalLength) {
				verticalLength = 0;
			} else if (Type.isNumber(verticalLength)) {
				verticalLength += 'px';
			}

			value.push(verticalLength);

			if (blurRadius) {
				if (Type.isNumber(blurRadius)) {
					blurRadius += 'px';
				}

				value.push(blurRadius);
			}

			if (color && Color.isValidCSS(color)) {
				value.push(color.toString());
			}

			return {
				text_shadow: value.join(' ')
			};
		}
	}