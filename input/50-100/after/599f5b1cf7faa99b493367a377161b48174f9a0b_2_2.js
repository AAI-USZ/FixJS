function() {
      var value = ByteCode.pop();
      var arrayIndex = ByteCode.pop().value;
      //Get the int from the Primitive class
      var array = ByteCode.pop();
      if( array === null) {
        ByteCode.throwException("NullPointerException");
        return;
      }
      if(arrayIndex < 0 && arrayIndex >= array.length) {
        ByteCode.throwException("ArrayIndexOutOfBoundsException");
        return;
      }
      array.set(arrayIndex, value);
      //arrayRef[arrayIndex] = value;
    }