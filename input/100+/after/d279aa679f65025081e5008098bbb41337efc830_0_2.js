function (horizontalLength, verticalLength, blurRadius, spread, color, set) {
		if (horizontalLength !== undefined && verticalLength !== undefined) {
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

			if (spread) {
				if (Type.isNumber(spread)) {
					spread += 'px';
				}

				value.push(spread);
			}

			if (color && Color.isValidCSS(color)) {
				value.push(color);
			}

			if (set && (set === 'inset' || set === 'outset')) {
				value.push(set);
			}

			value = value.join(' ');

			var out = {};

			for (var i = 0; i < CSS.properties.boxShadow.length; ++i) {
				out[CSS.properties.boxShadow[i]] = value;
			}

			return out;
		}
	}