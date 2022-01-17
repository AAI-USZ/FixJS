function _matrixToCSS(m) {
		m.a = Number(m.a).toFixed(20);
		m.b = Number(m.b).toFixed(20);
		m.c = Number(m.c).toFixed(20);
		m.d = Number(m.d).toFixed(20);

		return "matrix(" + m.a + "," + m.b + "," + m.c + "," + m.d + "," + m.tx + "," + m.ty + ")";
	}