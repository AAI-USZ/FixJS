function Bool(value){
      require('util/Util').inherits(this, Primitive, Data.type.BOOLEAN, value & 0x1);
    }