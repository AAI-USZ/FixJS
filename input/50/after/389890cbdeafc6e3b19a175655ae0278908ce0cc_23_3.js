function Bool(value){
      require('util/Util').inherits(this, Primitive, Enum.dataType.BOOLEAN, value & 0x1);
    }