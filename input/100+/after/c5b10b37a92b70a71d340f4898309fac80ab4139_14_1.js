function TopObjectHandle(schema, typeSchema, obj, parent, id){
	//_.assertLength(arguments, 5);
	_.assertObject(obj);
	
	if(!typeSchema.isView){
		_.assertInt(id)
	}else{
		_.assertString(id)
	}
	
	this.schema = schema;
	this.typeSchema = typeSchema;

	this.obj = {}
	this.edits = obj
	
	this.parent = parent;
	this.cachedProperties = {};
	
	this.objectId = id;
	this.objectTypeCode = typeSchema.code;

	this.currentHandle = this
	_.assertObject(this.currentHandle)
	
	this.lastEditId = -1
	
	//console.log('got edits: ' + JSON.stringify(obj))
	/this.edits.forEach(function(e){
		_.assertInt(e.editId)
	})
}