function(oldObjHandle, newObjHandle){
	_.assertLength(arguments, 2);
	
	if(!(newObjHandle instanceof TopObjectHandle)) _.errout('TODO implement hoist to top: ' + newObjHandle.constructor);
	
	if(this.obj === undefined){
		_.errout('cannot replaceExisting on empty list');
	}
	
	var oldId = oldObjHandle._internalId()

	var index = this.obj.indexOf(oldObjHandle)

	if(index === undefined){
		_.errout('object to replace not found');
	}
	
	var id = newObjHandle._internalId()
	
	this.obj[index] = newObjHandle
	
	var e = {oldId: oldId, newId: id, newType: newObjHandle.typeSchema.code}

	if(oldObjHandle.isInner()){
		this.saveEdit('replaceInternalExisting', e)
	}else{
		this.saveEdit('replaceExternalExisting', e)

	}	

	this.emit(e, 'replace', oldObjHandle, newObjHandle)()
}