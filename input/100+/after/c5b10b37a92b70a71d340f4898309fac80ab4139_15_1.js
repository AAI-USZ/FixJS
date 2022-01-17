function changeListener(op, edit, syncId, editId){
	//_.assertLength(path, 0);

	if(syncId === this.getEditingId()){
		console.log('ignoring change by same user')
		return stub;//TODO deal with local/global priority
	}
	
	if(op.indexOf('set') === 0){
		this.obj = edit.value;
		console.log('set happened(' + this.getEditingId() + ')(' + syncId + '): ' + edit.value)
		//this.parent.obj[this.part[0]] = edit.value
		return this.emit(edit, 'set')
	}else{
		_.errout('-TODO implement op: ' + op + ' ' + JSON.stringify(edit));
	}
}