function(index, constant) {
      var currentValue = ByteCode.getLocal(index);
      ByteCode.setLocal(index, Primitives.getInteger(currentValue.value + constant));
    }