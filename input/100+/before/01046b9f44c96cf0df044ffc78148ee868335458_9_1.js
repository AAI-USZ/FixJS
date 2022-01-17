function convertHexToRGB(col) {
	if (col.indexOf('#') != -1) {
		col = col.replace(new RegExp('[^0-9A-F]', 'gi'), '');

		r = parseInt(col.substring(0, 2), 16);
		g = parseInt(col.substring(2, 4), 16);
		b = parseInt(col.substring(4, 6), 16);

		return {r : r, g : g, b : b};
	}

	return null;
}