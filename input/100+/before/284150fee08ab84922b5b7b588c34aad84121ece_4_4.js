function(prop, interceptor, extValue){
    if(extValue !== undefined){
        this[prop](extValue);
        
        extValue = this.getStaticPropertyValue(prop);
    } else if(!this._intercepted || !this._intercepted[prop]) { // Don't intercept any previous interceptor...
        extValue = this.getStaticPropertyValue(prop);
    }
        
    // Let undefined pass through as a sign of not-intercepted
    // A 'null' value is considered as an existing property value.
    if(extValue !== undefined){
        extValue = pv.functor(extValue);
    }
    
    function interceptProp(){
        var args  = arraySlice.call(arguments);
        return interceptor.call(this, extValue, args);
    }

    this[prop](interceptProp);

    (this._intercepted || (this._intercepted = {}))[prop] = true;

    return this;
}