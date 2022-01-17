function(rcvr, key){
      return key in this.values ? get.call(this, key) : Bitfield.prototype[key];
    }