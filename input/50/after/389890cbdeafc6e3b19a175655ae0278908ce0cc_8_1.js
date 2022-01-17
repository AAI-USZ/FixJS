function(constantPool) {
      this._name = constantPool.getUTF8Info(this.nameIndex);
      
      //Name must be either <init>, OR a field / method.
      //

      this._descriptor = constantPool.getUTF8Info(this.descriptorIndex);
    }