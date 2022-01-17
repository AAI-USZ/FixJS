function ViewObjectSetHandle(typeSchema, obj, part, parent){
	this.part = part;
	this.parent = parent;
	this.schema = typeSchema;

	console.log('obj: ' + JSON.stringify(obj))
	this.obj = u.wrapCollection(this, obj)
}