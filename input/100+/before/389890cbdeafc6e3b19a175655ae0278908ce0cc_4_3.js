function(constant) {
      if(constant.getTag() === Enum.constantPoolTag.INTEGER) {
        ByteCode.push(constant.value);
        return;
      }
      if(constant.getTag() === Enum.constantPoolTag.FLOAT) {
        ByteCode.push(constant.value);
        return;
      }
      if(constant.getTag() === Enum.constantPoolTag.STRING) {
        //ConstantPoolInfo
        ByteCode.push(Util.getJavaString(constant.string));
        return;
      }
      if(constant.getTag() === Enum.constantPoolTag.CLASS) {
        ByteCode.push(Util.getJavaString(constant.name));
        return;
      }
    }