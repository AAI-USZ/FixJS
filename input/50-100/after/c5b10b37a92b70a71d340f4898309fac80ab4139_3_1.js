function(v){
	this.obj = v;

	var e = {value: this.obj}
	this.saveEdit('setBoolean', e);
		
	this.emit(e, 'set', v)()
}