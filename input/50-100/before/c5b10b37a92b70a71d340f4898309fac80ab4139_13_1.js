function(){
	this.obj = Date.now();

	var e = {value: this.obj}
	
	this.getSh().persistEdit(
		this.getObjectId(), 
		this.getPath(),
		'set',
		e, 
		this.getEditingId());
		
	//this.refresh()();
	this.emit(e, 'set', this.obj)()
}