function(constant) {
      if(constant.getTag() === Enum.constantPoolTag.LONG) {
        ByteCode.push(constant.value());
        return;
      }
      if(constant.getTag() === Enum.constantPoolTag.DOUBLE) {
        ByteCode.push(constant.value());
        return;
      }
    }