function Byte(value){
      require('util/Util').inherits(this, Primitive, Enum.dataType.BYTE, value & 0xFF);
    }