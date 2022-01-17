function(v){
	
	this.obj = v;
	
	//console.log('path: ' + JSON.stringify(this.getPath()));
	this.getSh().persistEdit(
		this.getObjectId(), 
		this.getPath(),
		'set',
		{value: this.obj}, 
		this.getEditingId());
		
	this.refresh()();
}