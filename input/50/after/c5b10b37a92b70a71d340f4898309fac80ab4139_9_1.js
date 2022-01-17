function ObjectSetHandle(typeSchema, obj, part, parent){
	this.part = part;
	this.parent = parent;
	this.schema = typeSchema;

	this.obj = u.wrapCollection(this, obj)
}