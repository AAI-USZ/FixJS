function(typeName, json,cb){
	if(_.isObject(typeName)){
		cb = json
		json = typeName
		typeName = undefined
	}
	if(json !== undefined && !_.isObject(json)){
		cb = json
		json = undefined
	}
	if(json === undefined) json = {}
	
	var forget = false;
	if(cb === true){
		cb = undefined
		forget = true
	}
	
    var objSchema = this.schema[typeName]
    if(objSchema  === undefined) throw new Error('unknown type: ' + typeName)
	var typeCode = objSchema.code;
	var objEdits = jsonutil.convertJsonToEdits(this.schema, typeName, json);
	
	if(forget){
		//var obj = json
		//obj.meta = {id: 0, typeCode: typeCode, editId: -1};
		//var edit = {obj: {type: typeCode, object: obj}, forget: true};

		this.createNewExternalObject(typeCode, temporary, objEdits, forget)
	}else{
		var temporary = this.makeTemporaryId()//u.makeTemporaryId();//TODO should be unique to the sync handle for parallelism with the server-side handle


		var res = this.createNewExternalObject(typeCode, temporary, objEdits, forget)
	
		res.prepare();

		if(cb){
			if(this.parent.objectCreationCallbacks === undefined) this.parent.objectCreationCallbacks = {};
			this.parent.objectCreationCallbacks[temporary] = cb;
		}

		return res;
	}
}