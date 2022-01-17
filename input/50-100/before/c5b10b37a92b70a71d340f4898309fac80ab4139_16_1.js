function ViewObjectSetHandle(typeSchema, obj, part, parent){
	this.part = part;
	this.obj = obj || [];
	this.parent = parent;
	this.schema = typeSchema;

	this.apiCache = {};
}