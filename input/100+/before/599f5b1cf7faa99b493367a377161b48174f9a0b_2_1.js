function(constant) {
      if(constant.getTag() === Enum.constantPoolTag.INTEGER) {
        ByteCode.push(constant.value());
      }
      if(constant.getTag() === Enum.constantPoolTag.FLOAT) {
        ByteCode.push(constant.value());
      }
      if(constant.getTag() === Enum.constantPoolTag.STRING) {
        //ConstantPoolInfo
        // /alert(constant.string);
        ByteCode.push(Util.getJavaString(constant.value()));
      }
      if(constant.getTag() === Enum.constantPoolTag.CLASS) {
        ByteCode.push(Util.getJavaString(constant.getName()));
      }
    }