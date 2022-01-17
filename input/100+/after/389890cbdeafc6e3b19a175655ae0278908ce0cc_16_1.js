function() {
      if (this.fieldDescriptor.type === FieldDescriptor.type.BASE)
      {
        switch(this.fieldDescriptor.baseValue)
        {
          case FieldDescriptor.baseType.BYTE:
            this.value = Primitives.getByte(0);
            break;
          case FieldDescriptor.baseType.CHAR:
            this.value = Primitives.getChar(0);
            break;
          case FieldDescriptor.baseType.DOUBLE:
            this.value = Primitives.getDouble(0);
            break;
          case FieldDescriptor.baseType.FLOAT:
            this.value = Primitives.getFloat(0);
            break;
          case FieldDescriptor.baseType.INTEGER:
            this.value = Primitives.getInteger(0);
            break;
          case FieldDescriptor.baseType.LONG:
            this.value = Primitives.getLongFromNumber(0);
            break;
          case FieldDescriptor.baseType.SHORT:
            this.value = Primitives.getShort(0);
            break;
          case FieldDescriptor.baseType.BOOLEAN:
            this.value = Primitives.getBool(0);
            break;
          default:
            Util.assert(false);
            break;
        }
      }
      else {
        this.value = null;
      }

      if (this.constantValueAttribute !== undefined)
      {
        var constVal = this.constantValueAttribute;
        if (constVal.getTag() === Enum.constantPoolTag.STRING)
        {
          this.value = Util.getJavaString(constVal.getValue());
        }
        else
        {
          this.value = constVal.value;
        }
      }
    }