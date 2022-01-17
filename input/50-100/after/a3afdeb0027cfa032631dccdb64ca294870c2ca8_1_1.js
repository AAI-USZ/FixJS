function(entries) {
	var examples = [];
	for(name in entries) if(entries.hasOwnProperty(name)) {
		examples.push(new JSSpec.Example(name, entries[name], this.beforeEach, this.afterEach, this.context));
	}
	return examples;
}