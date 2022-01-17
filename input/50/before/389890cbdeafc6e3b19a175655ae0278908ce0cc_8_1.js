function(constantPool) {
      this.name = constantPool.getUTF8Info(this.nameIndex);
      
      this.descriptor = constantPool.getUTF8Info(this.descriptorIndex);
    }