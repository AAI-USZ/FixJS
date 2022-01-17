function(typeName, json,cb){
    var objSchema = this.schema[typeName]
    if(objSchema  === undefined) throw new Error('unknown type: ' + typeName)
	var typeCode = objSchema.code;
	var objJson = jsonutil.convertJsonToObject(this.schema, typeName, json);

	var temporary = u.makeTemporaryId();
	
	var obj = this.createNewExternalObject(typeCode, temporary)
	_.extend(obj, objJson)
	
	
	var edit = {obj: {type: typeCode, object: obj}, temporary: temporary};
	if(cb){
		var uid = (''+Math.random());
		if(this.parent.objectCreationCallbacks === undefined) this.parent.objectCreationCallbacks = {};
		this.parent.objectCreationCallbacks[uid] = cb;
		edit.uid = uid;
		//console.log('waiting for makeObjectFromJson callback')
	}
	this.getSh().persistEdit(
		-1, 
		[], 
		'make',
		edit,
		this.getEditingId());
	
	
	
	var res = this.getObjectApi(temporary, this);
	res.prepare();
	return res;
}