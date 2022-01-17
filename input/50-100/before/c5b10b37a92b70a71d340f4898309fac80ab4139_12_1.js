function(str){
	
	if(this.obj === str) return;
	
	this.obj = str;
	
	//console.log('path: ' + JSON.stringify(this.getPath()));
	var e = {value: this.obj}
	
	this.getSh().persistEdit(
		this.getObjectId(), 
		this.getPath(),
		'set',
		e, 
		this.getEditingId());
		
	//this.refresh()();
	this.emit(e, 'set', str)()
}