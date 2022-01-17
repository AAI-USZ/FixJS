function(mockClassReader, name) {
      var j, type, val, length, memberName;
      //Prepended to names.
      name = name === undefined ? '' : name + ".";

      for (j = 0; j < this.values; j++) {
        val = this.values[j];
        type = this.type.getMemberType(j);
        memberName = name + this.type.getName(j);

        if (type in StructDataTypes) {
          mockClassReader.addField(type, val, memberName);
        }
        else {
          val.addToClassReader(mockClassReader, memberName);
        }
      }
    }