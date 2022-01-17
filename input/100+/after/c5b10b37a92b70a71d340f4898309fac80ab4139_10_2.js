function(op, edit, syncId, editId){
	_.assertLength(arguments, 4);

	//if(!this.schema.isView) _.assert(syncId >= 0)
	
	if(this.latestVersionId < editId) this.latestVersionId = editId
	//if(editId < this.latestVersionId) throw new Error('out of order edits(' + this.latestVersionId + ' > ' + editId + '): ' + JSON.stringify(arguments))
	//if(path.length > 0) _.errout('invalid path, cannot descend into primitive list: ' + JSON.stringify(path))
		
	if(op.indexOf('add') === 0){
		if(this.getEditingId() !== syncId){
			console.log('pushing ' + edit.value + ' onto ' + JSON.stringify(this.obj) + ' ' + JSON.stringify([edit, editId]) + ' ' + this.getEditingId() + ' ' + syncId)
			this.obj.push(edit.value);
			
			return this.emit(edit, 'add')
		}else{
			return stub;
		}
	}else if(op === 'shift'){
		if(this.getEditingId() !== syncId){

			_.assert(this.obj.length >= 1);
			this.obj.shift();

			return this.emit(edit, 'shift')
			
		}else{
			return stub;
		}
	}else if(op.indexOf('remove') === 0){
		if(this.getEditingId() !== syncId){
			var index = this.obj.indexOf(edit.value);
			if(index === -1){
				console.log('ignoring invalid remove: ' + edit.value);
			}else{
				this.obj.splice(index, 1);
				
				return this.emit(edit, 'remove')
			}
		}		
		return stub;
	}else{
		_.errout('+TODO implement op: ' + JSON.stringify(edit));
	}
}