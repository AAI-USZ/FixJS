function Short(value){
      require('util/Util').inherits(this, Primitive, Enum.dataType.SHORT, value & 0xFFFF);
    }