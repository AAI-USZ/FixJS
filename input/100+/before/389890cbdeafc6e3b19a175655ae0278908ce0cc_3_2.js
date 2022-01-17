function(jcr, constantPool, attributeName, attributeLength) {
      var numberOfClasses = jcr.getUintField(2);
      
      var classes = [];
      for (var i = 0; i < numberOfClasses; i++)
      {
        var innerClassInfoIndex = jcr.getUintField(2);
        var innerClassInfo = constantPool.getClassInfo(innerClassInfoIndex);
        var outerClassInfoIndex = jcr.getUintField(2);
        var outerClassInfo = constantPool.getClassInfo(outerClassInfoIndex);
        var innerNameIndex = jcr.getUintField(2);
        var innerName = constantPool.getUTF8Info(innerNameIndex);
        var innerClassAccessFlags = jcr.getUintField(2);
        classes[i] = new ClassEntry(innerClassInfo, outerClassInfo, innerName, innerClassAccessFlags);
      }

      return new InnerClassAttribute(attributeName, classes);
    }