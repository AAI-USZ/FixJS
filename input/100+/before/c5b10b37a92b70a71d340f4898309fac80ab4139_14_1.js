function TopObjectHandle(schema, typeSchema, obj, parent, id){
	_.assertLength(arguments, 5);
	_.assertObject(obj);
	
	if(!typeSchema.isView){
		_.assertInt(id)
	}else{
		_.assertString(id)
	}
	
	//if(!(parent instanceof SyncApi)) _.errout('ERROR: ' + parent.toString());
	
	this.schema = schema;
	this.typeSchema = typeSchema;
	this.obj = obj;
	this.parent = parent;
	this.cachedProperties = {};
	
	this.objectId = id;
	this.objectTypeCode = typeSchema.code;

}