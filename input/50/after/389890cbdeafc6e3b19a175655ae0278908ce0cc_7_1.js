function(constantPool) {
      this._name = constantPool.getUTF8Info(this.nameIndex);

      Util.checkIsValidClassOrInterfaceName(this._name);
    }