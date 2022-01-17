function(str){
	
	if(this.obj === str) return;
	
	this.obj = str;
	
	//console.log('path: ' + JSON.stringify(this.getPath()));
	console.log(this.rrr + ' string set: ' + str)
	
	var e = {value: this.obj}

	this.saveEdit('setString', e);
		
	this.emit(e, 'set', str)()
}