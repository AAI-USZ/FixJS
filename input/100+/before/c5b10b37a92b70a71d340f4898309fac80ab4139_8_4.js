function(oldObjHandle, newObjHandle){
	_.assertLength(arguments, 2);
	
	if(!(newObjHandle instanceof TopObjectHandle)) _.errout('TODO implement hoist to top: ' + newObjHandle.constructor);
	
	if(this.obj === undefined){
		_.errout('cannot replaceExisting on empty list');
	}
	
	var oldId = oldObjHandle.id();

	var index = u.findListElement(this.obj, oldId);

	this.clearApiCache(oldId);
	
	if(index === undefined){
		_.errout('object to replace not found');
	}
	
	var id = newObjHandle.id();
	
	this.obj[index] = id;
	
	var e = {newId: id, newType: newObjHandle.typeSchema.code, oldId: oldId}
	
	this.getSh().persistEdit(
		this.getObjectId(), 
		this.getPath().concat([oldId]), 
		'replaceExisting',
		e,
		this.getEditingId());
		
//	this.refresh()();	
	this.emit(e, 'replace')()
}