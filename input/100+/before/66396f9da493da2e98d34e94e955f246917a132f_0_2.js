function(evt){
D('_start');
    var mtx=this.element.getBoundingClientRect();
	this.metorix={x:mtx.left, y:mtx.top, r:mtx.right, b:mtx.bottom, w:mtx.right-mtx.left, h:mtx.bottom-mtx.top};
	
	this.tpos.add(evt);
	
    this._setTarget(evt);
	this._setOptionalTargets(evt);
	
	this.stopEvent(evt);
	if( this.cbStart && this.inElement(this.targets[0]) ){
		this.cbStart.call(this, evt, this.tpos.current);
	
	}
//    if( this.touchCount()===1 ){
//        this.on('move');
//        this.on('end');
//    }
 	
D('_start;');
	return true;
}