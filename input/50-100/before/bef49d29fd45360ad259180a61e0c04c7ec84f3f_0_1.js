function slashAdd(v) {
		v = v.toString();
		v = v.replace(/\\/g, "\\");
		v = v.replace(/\r/g, "\\r");
		v = v.replace(/\t/g, "\\t");
		v = v.replace(/\f/g, "\\f");
		v = v.replace(/\n/g, "\\n");
		return v;
	}