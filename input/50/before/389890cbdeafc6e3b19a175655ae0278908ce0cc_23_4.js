function Char(value){
      require('util/Util').inherits(this, Primitive, Data.type.CHAR, value & 0xFF);
    }