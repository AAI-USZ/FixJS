function types(){
	var fullSchema = this.getFullSchema();
	var objectSchema = fullSchema[this.schema.type.members.object];
	return recursivelyGetLeafTypes(objectSchema, fullSchema);
}