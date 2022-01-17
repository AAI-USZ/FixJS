function compileTmpl( template ) {
	try {
		return typeof jsviews.templates( template ).fn === "function" ? "compiled" : "failed compile";
	}
	catch(e) {
		return e.message;
	}
}