function Char(value){
      require('util/Util').inherits(this, Primitive, Enum.dataType.CHAR, value & 0xFF);
    }