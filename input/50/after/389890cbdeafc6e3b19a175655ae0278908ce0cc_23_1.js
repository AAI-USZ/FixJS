function Integer(value){
      require('util/Util').inherits(this, Primitive, Enum.dataType.INTEGER, value & 0xFFFFFFFF); //Whatever the value is make it a 32bit signed int
    }