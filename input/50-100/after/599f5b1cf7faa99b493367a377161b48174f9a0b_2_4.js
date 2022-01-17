function(className) {
      var arrayLength = ByteCode.pop().value;
      //Get the integer value
      if(arrayLength < 0) {
        ByteCode.throwException("NegativeArraySizeException");
        return;
      }
      var class_ = JVM.getClass(className);
      ByteCode.push(new JavaArray(Enum.dataType.OBJECT, class_, 1, arrayLength));
    }