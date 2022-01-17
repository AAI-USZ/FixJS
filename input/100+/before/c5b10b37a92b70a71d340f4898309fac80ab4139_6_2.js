function(newKey, newTypeName, external){
	if(this.schema.type.value.type !== 'object') _.errout('cannot putNew - values are not objects');

	var type = getOnlyPossibleType(this, newTypeName);
	
	var temporaryId = u.makeTemporaryId();
	
	var e = {newType: type.code, key: newKey, external: external, temporary: temporaryId};
	this.getSh().persistEdit(
		this.getObjectId(), 
		this.getPath(),
		'putNew',
		e,
		this.getEditingId());

	//if(this.obj === undefined) this.obj = {};
	
	if(external){
		this.createNewExternalObject(type.code, temporaryId);
		this.obj[newKey] = temporaryId//.push(temporaryId);
	}else{
		console.log('not external')
		this.obj[newKey] = {meta: {id: temporaryId, typeCode: type.code}};
	}
		
	this.refresh()();
	//console.log('finished refresh after addNew');

	var res = this.getObjectApi(temporaryId, this);
	res.prepare();
	return res;	
	
}