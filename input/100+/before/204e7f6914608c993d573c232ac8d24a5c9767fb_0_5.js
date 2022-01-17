function() {
        var _ = this._;

        sendkeyoff.call(this);
        
        _.index =  0;
        _.segnoIndex = {};
        _.loopStack  = [];
        _.samples = 0;
        
        timbre.fn.doEvent(this, "bang");
        
        return this;
    }