function(){
	var fullSchema = this.getFullSchema();
	var objectSchema = fullSchema[this.schema.type.value.object];
	return recursivelyGetLeafTypes(objectSchema, fullSchema);
}