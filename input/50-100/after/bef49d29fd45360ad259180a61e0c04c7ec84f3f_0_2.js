function slashRemove(v) {
		v = v.replace(/\xB7/g, " ");
		v = v.replace(/\\r/g, "\r");
		v = v.replace(/\\t/g, "\t");
		v = v.replace(/\\f/g, "\f");
		v = v.replace(/\\n/g, "\n");
		v = v.replace(/\\\\/g, "\\");
		return v;
	}