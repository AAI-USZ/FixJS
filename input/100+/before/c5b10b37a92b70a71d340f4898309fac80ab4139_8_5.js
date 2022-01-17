function(typeName, json){

	if(arguments.length === 1){
		if(_.isObject(typeName)){
			json = typeName
			typeName = undefined;
		}
	}
	
	json = json || {}
	
	var type = u.getOnlyPossibleType(this, typeName);
	
	var temporaryId = u.makeTemporaryId();
		
	var newObj = jsonutil.convertJsonToObject(this.getFullSchema(), type.name, json);
	newObj.meta = {id: temporaryId, typeCode: type.code, editId: -10}

	var ee = {temporary: temporaryId, obj: {type: type.code, object: newObj}};
	
	this.obj.push(newObj);
	var res = this.wrapObject(newObj, [], this);
	this.addToApiCache(temporaryId, res);
	this.saveEdit('addNewInternal', ee);
		
	//this.refresh()();
	
	res.prepare();

	this.emit(ee, 'add', res)()
	
	return res;
}