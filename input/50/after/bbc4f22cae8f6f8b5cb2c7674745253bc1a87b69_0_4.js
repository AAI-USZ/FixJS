function(rcvr, key, val){
      this.values.hasOwnProperty(key) ? set.call(this, key, val) : (Bitfield.prototype[key] = val)
    }