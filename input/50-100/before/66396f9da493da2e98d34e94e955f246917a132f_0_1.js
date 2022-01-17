function(evt){
D('_cancel '+this.target);
	
	this.stopEvent(evt);
	if( this.cbCancel ){
		this.cbCancel.call(this, evt, this.tpos.current);
	}
	
	this.tpos.clear();
//	this.off('move');
//	this.off('end');

	return true;
}