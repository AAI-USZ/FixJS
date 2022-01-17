function(v){
	this.obj = v;

	var e = {value: this.obj}
	this.saveEdit('setInt', e);
		
	this.emit(e, 'set', v)()
}