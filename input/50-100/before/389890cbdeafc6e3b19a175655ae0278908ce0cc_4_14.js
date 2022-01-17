function(atype) {
      //atype might be needed not sure
      var count = ByteCode.pop().value;

      if(count < 0) {
        ByteCode.throwException("NegativeArraySizeException");
        return;
      }

      ByteCode.push(new JavaArray(Data.type.PRIMITIVE, ArrayType.type[atype], 1, count));
    }