function(typeName, json){

	if(arguments.length === 1){
		if(_.isObject(typeName)){
			json = typeName
			typeName = undefined
		}
	}
	json = json || {}
	
	var type = u.getOnlyPossibleType(this, typeName);	
	
	this.saveEdit('addNew', {typeCode: type.code})

	var n = this._makeAndSaveNew(json, type)
	
	this.emit({}, 'add', n)()
	this.obj.push(n)

	return n
	/*
	var res = //this.createNewExternalObject(type.code, temporary, edits, forg)
	
		res.prepare();

		if(cb){
			if(this.parent.objectCreationCallbacks === undefined) this.parent.objectCreationCallbacks = {};
			this.parent.objectCreationCallbacks[temporary] = cb;
		}

		return res;*/
	/*
	obj.meta = {typeCode: type.code, id: temporaryId, editId: -10}
	
	var ee = {temporary: temporaryId, newType: type.code, obj: {type: type.code, object: obj}};
	
	this.saveEdit('addNewInternal',	ee);
	
	var res = this.wrapObject(obj, [], this)

	this.obj.push(res);	

	this.emit(ee, 'add', res)()
	return res*/
}