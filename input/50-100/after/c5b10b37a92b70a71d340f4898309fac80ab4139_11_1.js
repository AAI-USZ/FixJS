function(value){

	var index = this.obj.indexOf(value)
	if(index === -1) _.errout('tried to remove value not in collection: ' + value);
	
	this.obj.splice(index, 1)
	var e = {value: value}
	var ts = typeSuffix[this.schema.type.members.primitive]
	_.assertString(ts)
	this.saveEdit('remove'+ts, e);
	
	this.emit(e, 'remove', value)()
}