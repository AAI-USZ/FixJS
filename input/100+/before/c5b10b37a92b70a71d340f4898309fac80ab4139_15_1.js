function changeListener(path, op, edit, syncId){
	_.assertLength(path, 0);

	if(syncId === this.getEditingId()){
		return stub;//TODO deal with local/global priority
	}
	
	if(op === 'set'){
		this.obj = edit.value;
		return this.emit(edit, 'set')
	}else{
		_.errout('-TODO implement op: ' + JSON.stringify(edit));
	}
	
	//return this.refresh();
}