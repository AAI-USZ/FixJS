function(jcr, klass, constantPool) {
      var accessFlags = jcr.getUintField(2);
      
      var nameIndex = jcr.getUintField(2);
      var name = constantPool.getUTF8Info(nameIndex);
      
      var descriptorIndex = jcr.getUintField(2);
      var descriptor = constantPool.getUTF8Info(descriptorIndex);
      var methodDescriptor = Util.parseMethodDescriptor(descriptor);
      
      var attributesCount = jcr.getUintField(2);
      var attributes = AttributeFactory.parseAttributes(jcr, attributesCount, constantPool);

      return new Method(klass, accessFlags, name, descriptor, methodDescriptor, attributes);
    }