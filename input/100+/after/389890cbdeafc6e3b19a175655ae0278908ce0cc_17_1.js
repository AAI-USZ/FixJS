function(jcr, klass, constantPool) {
      var accessFlags = jcr.getUintField(2),
          nameCp = constantPool.getUTF8Info(jcr.getUintField(2)),
          descriptor = constantPool.getUTF8Info(jcr.getUintField(2)),
          attributesCount = jcr.getUintField(2),
          attributes = AttributeFactory.parseAttributes(jcr, attributesCount, constantPool),
          fieldDescriptor = Util.parseFieldDescriptor(descriptor);

      return new FieldInfo(klass, accessFlags, name, descriptor, attributesCount, fieldDescriptor, attributes);
    }