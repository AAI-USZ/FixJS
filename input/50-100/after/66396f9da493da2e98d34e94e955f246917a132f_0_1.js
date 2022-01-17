function(evt){
    this.stopEvent(evt);
    if( this.cbCancel ){
        this.cbCancel.call(this, evt, this.tpos.current);
    }
	
	this.tpos.clear();
	return true;
}