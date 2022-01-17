function(evt){
    this._setOptionalTargets(evt);
    
    this.stopEvent(evt);
    if( this.cbEnd ){
        this.cbEnd.call(this, evt, this.tpos.current);
    }
    this.tpos.clear();
    if( this.changedTouches[0]===this.currentTargets[0] ){
        this._click(evt);
    }
    return true;
}