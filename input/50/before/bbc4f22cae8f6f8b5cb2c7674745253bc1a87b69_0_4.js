function(rcvr, key, val){
      key in this.values ? set.call(this, key, val) : (Bitfield.prototype[key] = val)
    }