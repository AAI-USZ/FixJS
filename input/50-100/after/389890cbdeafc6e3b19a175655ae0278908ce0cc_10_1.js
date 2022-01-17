function ConstantPool(cpItems, length) {
      var i;

      this.cpItems = cpItems;
      this.length = length;
      
      //Constant pool items sometimes refer to other constant pool items, and
      //we cannot resolve these references until the constant pool is completely
      //assembled. So, we do it after the fact.
      for (i = 1; i < this.getLength(); i++)
      {
        if (i in this.cpItems) //This may be false for the second items for double/long constants.
        {
          this.cpItems[i].resolveReferences(this);
        }
      }
    }