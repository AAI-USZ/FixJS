function(rcvr, key){
      return this.values.hasOwnProperty(key) ? get.call(this, key) : Bitfield.prototype[key];
    }