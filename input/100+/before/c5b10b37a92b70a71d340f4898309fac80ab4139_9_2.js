function(objHandle){
	_.assertObject(objHandle)
	
	var id = objHandle.id();
	
	var ee = {id: id}
	
	this.saveEdit('addExisting', ee);
	
	this.obj.push(id);

	//this.refresh()();
	this.emit(ee, 'add', this.get(id))()
}