function Byte(value){
      require('util/Util').inherits(this, Primitive, Data.type.BYTE, value & 0xFF);
    }