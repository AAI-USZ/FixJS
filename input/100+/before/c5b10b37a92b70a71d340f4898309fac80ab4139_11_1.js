function(path, op, edit, syncId){
	_.assertLength(arguments, 4);
	_.assertString(op)

	if(path.length > 0) _.errout('invalid path, cannot descend into primitive set: ' + JSON.stringify(path))
	
	if(op === 'add'){
		var arr = this.obj
		if(arr === undefined) arr = this.obj = [];
		arr.push(edit.value);
		//return this.refresh();
		return this.emit(edit, 'add')
	}else{
		_.errout('@TODO implement op: ' + op + ' ' + JSON.stringify(edit));
	}
}