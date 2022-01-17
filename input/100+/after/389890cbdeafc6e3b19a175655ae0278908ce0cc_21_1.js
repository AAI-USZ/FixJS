function(jcr, klass, constantPool) {
      var accessFlags = jcr.getUintField(2),
          name = constantPool.getUTF8Info(jcr.getUintField(2)),
          descriptor = constantPool.getUTF8Info(jcr.getUintField(2)),
          attributesCount = jcr.getUintField(2),
          attributes = AttributeFactory.parseAttributes(jcr, attributesCount, constantPool),
          methodDescriptor = Util.parseMethodDescriptor(descriptor);

      return new Method(klass, accessFlags, name, descriptor, methodDescriptor, attributes);
    }