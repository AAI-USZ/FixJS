function(number, distance) {

			var parts;
			var exponent;
			var factor;
			var result;
			var decimalPlaces;

			// say we have a number: 5.89
			// we first calculate its exponent: 0
			parts = number.toExponential().split('e');
			exponent = Number(parts[1]);

			// next we subtract 1 from the exponent: -1
			exponent = exponent - 1;

			// then we calculate our desired factor: 10^-1 = 0.1
			factor = Math.pow(10, exponent);

			// next we modify the number by the distance
			result = number + distance * factor;

			// finally we make sure not to add rounding errors
			// how many decimal places does the factor (0.1) have?
			decimalPlaces = (factor.toString().split('.')[1] || "").length;

			// round to that many decimal places (2)
			return d3.round(result, decimalPlaces);
		}