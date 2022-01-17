function(objHandle){
	_.assertObject(objHandle)
	
	if(this.obj.indexOf(objHandle) !== -1){
		console.log('WARNING: ignored redundant add on viewobjectset')
	}else{
		this.obj.push(objHandle);

		this.emit(undefined, 'add', objHandle)()
	}
}