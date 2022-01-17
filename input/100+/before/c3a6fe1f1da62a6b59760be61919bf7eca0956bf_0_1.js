function Resource (name, description) {
	if (typeof _resources[name] === "object") {
		return _resources[name];
	}

	var key = null;

	this.name = name;
	this.directory = path_module.normalize(__dirname + '/../resources/' + this.name);
	this.template_dir = this.directory + '/templates/';
	this.config = description.config;
	this.router = description.router;
	this.resources = {};

	for (key in description.properties) {
		this[key] = description.properties[key];
	}

	if (Array.isArray(description.dependencies)) {
		for (key in description.dependencies) {
			this.resources[key] = description.dependencies[key];
		}
	}
	
	if (typeof description.construct === "function") {
		description.construct.call(this);
	}

	_resources[name] = this;
}