function(typeCode, temporaryId, obj, forget){
	_.assertLength(arguments, 4)
	//console.log('created external object ' + typeCode + ' ' + temporaryId)
	//return this.snap.objects[temporaryId] = {meta: {id: temporaryId, typeCode: typeCode, editId: -1}};

	this.sh.persistEdit('make', {typeCode: typeCode, forget: forget, temporary: temporaryId})
	this.currentObjectId = temporaryId

	//_.errout('TODO: include all obj edits')
	if(obj.length > 0){
		//this.sh.persistEdit('selectTopObject', {id: temporaryId})//TODO is this implicit?
		var sh = this.sh
		obj.forEach(function(edit){
			sh.persistEdit(edit.op, edit.edit)
		})
	}
	
	var t = this.schema._byCode[typeCode];
	var n = new TopObjectHandle(this.schema, t, obj, this, temporaryId);
	this.objectApiCache[temporaryId] = n;

	return n

}