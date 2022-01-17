function(op, edit, syncId, editId){
	_.assertLength(arguments, 4);
	_.assertString(op)

	//console.log('primitive set handle changeListener')

	//if(path.length > 0) _.errout('invalid path, cannot descend into primitive set: ' + JSON.stringify(path))
	
	if(op.indexOf('add') === 0){
		var arr = this.obj
		if(arr === undefined) arr = this.obj = [];
		arr.push(edit.value);

		return this.emit(edit, 'add')
	}else{
		_.errout('@TODO implement op: ' + op + ' ' + JSON.stringify(edit));
	}
}