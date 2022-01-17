function Short(value){
      require('util/Util').inherits(this, Primitive, Data.type.SHORT, value & 0xFFFF);
    }