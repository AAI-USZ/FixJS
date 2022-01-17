function(v){
	this.obj = v;

	this.getSh().persistEdit(
		this.getObjectId(), 
		this.getPath(), 
		'set',
		{value: this.obj}, 
		this.getEditingId());
		
	this.refresh()();

}