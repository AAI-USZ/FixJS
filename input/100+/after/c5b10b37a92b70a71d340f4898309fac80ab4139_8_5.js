function(typeName, json){

	if(arguments.length === 1){
		if(_.isObject(typeName)){
			json = typeName
			typeName = undefined;
		}
	}
	
	json = json || {}

	
	var type = u.getOnlyPossibleType(this, typeName);
	
	this.saveEdit('addNew', {typeCode: type.code})

	var n = this._makeAndSaveNew(json, type)
	_.assertObject(n)
	
	this.emit({}, 'add', n)()
	this.obj.push(n)

	return n

		/*
	var newObj = jsonutil.convertJsonToObject(this.getFullSchema(), type.name, json);
	newObj.meta = {id: temporaryId, typeCode: type.code, editId: -10}

	var ee = {temporary: temporaryId, obj: {type: type.code, object: newObj}};
	
	var newObjHandle = this.wrapObject(newObj, [], this)
	
	this.obj.push(newObjHandle);

	this.saveEdit('addNewInternal', ee);
	
	newObjHandle.prepare();

	this.emit(ee, 'add', newObjHandle)()
	
	return newObjHandle;*/
}