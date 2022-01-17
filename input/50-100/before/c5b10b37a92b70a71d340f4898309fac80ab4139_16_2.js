function(objHandle){
	_.assertObject(objHandle)
	
	var id = objHandle.id();
	
	if(this.obj.indexOf(objHandle) !== -1){
		console.log('WARNING: ignored redundant add on viewobjectset')
	}else{
		this.obj.push(id);

		this.emit(undefined, 'add', objHandle)()
	}
}