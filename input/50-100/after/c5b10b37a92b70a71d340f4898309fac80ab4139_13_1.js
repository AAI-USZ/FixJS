function(){
	this.obj = Date.now();

	var e = {value: this.obj}
	
	this.saveEdit('setLong', e);
		
	//this.refresh()();
	this.emit(e, 'set', this.obj)()
}