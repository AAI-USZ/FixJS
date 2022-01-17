function(path, op, edit, syncId){
	_.assertLength(arguments, 4);

	if(path.length > 0) _.errout('invalid path, cannot descend into primitive list: ' + JSON.stringify(path))
		
	if(op === 'add'){
		if(this.getEditingId() !== syncId){
			
			this.obj.push(edit.value);
			
//			return this.refresh();
			return this.emit(edit, 'add')
		}else{
			return stub;
		}
	}else if(op === 'shift'){
		if(this.getEditingId() !== syncId){

			_.assert(this.obj.length >= 1);
			this.obj.shift();

			//return this.refresh();
			return this.emit(edit, 'shift')
			
		}else{
			return stub;
		}
	}else if(op === 'removePrimitive'){
		if(this.getEditingId() !== syncId){
			var index = this.obj.indexOf(edit.value);
			if(index === -1){
				console.log('ignoring invalid remove: ' + edit.value);
			}else{
				this.obj.splice(index, 1);
				
//				return this.refresh();
				return this.emit(edit, 'remove')
			}
		}		
		return stub;
	}else{
		_.errout('+TODO implement op: ' + JSON.stringify(edit));
	}
}