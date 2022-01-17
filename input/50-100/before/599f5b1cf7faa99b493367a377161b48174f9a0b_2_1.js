function() {
      var arrayIndex = ByteCode.pop().value();
      //Assumed Integer Primative
      var array = ByteCode.pop();
      if(array === null) {
        ByteCode.throwException("NullPointerException");
        return;
      }
      if(arrayIndex < 0 && array >= array.length) {
        ByteCode.throwException("ArrayIndexOutOfBoundsException");
        return;
      }
      ByteCode.push(array.get(arrayIndex));
    }