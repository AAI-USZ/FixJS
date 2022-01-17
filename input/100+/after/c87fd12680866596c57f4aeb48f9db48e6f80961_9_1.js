function hex(value) {

		value = parseInt(value).toString(16);



		return value.length > 1 ? value : '0' + value; // Padd with leading zero

	}