function ObjectListHandle(typeSchema, obj, part, parent, isReadonly){
	
	this.part = part;
	this.obj = obj || [];
	_.assertArray(this.obj)
	
	this.parent = parent;
	this.schema = typeSchema;

	this.apiCache = {};

	//this.memberTypeCode = typeSchema.code;
	
	_.assertNot(obj === null);
	
	this.readonly = isReadonly;
	if(isReadonly){
		this.remove = readonlyError;
		this.add = readonlyError;
		this.replaceNew = readonlyError;
		this.replaceExisting = readonlyError;
		this.shift = readonlyError;
		this.addNew = readonlyError;
		this.addNewExternal = readonlyError;
	}
}