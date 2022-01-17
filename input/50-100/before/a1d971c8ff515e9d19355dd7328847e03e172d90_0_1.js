function () {
	var file_path = this.route_declaration_path_;
	if (!file_path) {
		throw new Error('Route declaration path not specified');
	}

	try {
		var declaration = DeclarationParser.parse(this.route_declaration_path_, this.type_handlers_);
		this.updateRoutes_(declaration);
		this.isLoaded_ = true;
	} catch (err) {
		throw new Error('Error parsing the route declaration file: ' + err.message);
	}
}