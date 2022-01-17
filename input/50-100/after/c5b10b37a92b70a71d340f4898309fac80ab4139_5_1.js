function(v){
	
	this.obj = v;
	
	var e = {value: this.obj}
	this.saveEdit('setLong', e)
		
	this.emit(e, 'set', v)()
}