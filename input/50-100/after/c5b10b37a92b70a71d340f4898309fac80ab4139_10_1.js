function(value){
	this.assertMemberType(value)
	
	var index = this.obj.indexOf(value);
	if(index !== undefined){

		this.obj.splice(index, 1);

		var e = {value: value}
		this.saveEdit(this.removeOp, e);
		
		this.emit(e, 'remove', value)()
	}else{
		_.errout('tried to remove object not in collection, id: ' + id);
	}
}