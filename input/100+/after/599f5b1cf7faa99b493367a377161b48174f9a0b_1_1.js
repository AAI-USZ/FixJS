function(jcr, attributesCount, constantPool) {
      var attributes = [];
      for (var i = 0; i < attributesCount; i++)
      {
        var attributeName = constantPool.getUTF8Info(jcr.getUintField(2));
        var attributeLength = jcr.getUintField(4);
        
        //Switching on Strings? In MY JavaScript? It's more likely than you think...
        switch(attributeName) {
          case "SourceFile":
            Util.assert(attributeLength === 2);
            var sourceFileIndex = jcr.getUintField(2);
            var sourceFile = constantPool.getUTF8Info(sourceFileIndex);
            attributes[i] = new SourceFileAttribute(attributeName, attributeLength, sourceFile);
            break;
          case "ConstantValue":
            Util.assert(attributeLength === 2);
            var constantValueIndex = jcr.getUintField(2);
            var constantValue = constantPool.get(constantValueIndex);
            attributes[i] = new ConstantValueAttribute(attributeName, attributeLength, constantValue);
            break;
          case "Code":
            attributes[i] = this.parseCodeAttribute(jcr, constantPool, attributeName);
            break;
          case "Exceptions":
            var numberOfExceptions = jcr.getUintField(2);
            //An array of constant pool references to exceptions
            var exceptionsIndexTable = [];
            for (var j = 0; j < numberOfExceptions; j++)
            {
              exceptionsIndexTable[j] = jcr.getUintField(2);
            }
            attributes[i] = new ExceptionAttribute(attributeName, attributeLength, exceptionsIndexTable);
            break;
          case "InnerClasses":
            attributes[i] = this.parseInnerClassAttribute(jcr, constantPool, attributeName, attributeLength);
            break;
          case "Synthetic":
            attributes[i] = new SyntheticAttribute(attributeName, attributeLength);
            break;
          case "LineNumberTable":
            attributes[i] = this.parseLineNumberTableAttribute(jcr, constantPool, attributeName);
            break;
          case "LocalVariableTable":
            attributes[i] = this.parseLocalVariableTable(jcr, constantPool, attributeName);
            break;
          case "Deprecated":
            attributes[i] = new DeprecatedAttribute(attributeName, attributeLength);
            break;
          default:
            var info = jcr.getUintField(attributeLength);
            attributes[i] = new GenericAttribute(attributeName, attributeLength, info);
            break;
        }
      }
      return attributes;
    }