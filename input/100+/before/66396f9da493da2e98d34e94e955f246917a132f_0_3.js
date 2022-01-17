function(evt){
D('_end ');
 	this._setOptionalTargets(evt);
D('_end2 '+this.targets.length+' '+ this.currentTargets.length+' '+ this.targetTouches.length+' '+this.changedTouches.length);
    
    this.stopEvent(evt);
    if( this.cbEnd ){
        this.cbEnd.call(this, evt, this.tpos.current);
    }
D('_end3 '+this.tpos); 
 
//    if( this.touchCount()===0 ){
        this.tpos.clear();
//        this.off('move');
//        this.off('end');
//    }
D('_end;'); 
    if( this.changedTouches[0]===this.currentTargets[0] ){
        this._click(evt);
    }
    return true;
}