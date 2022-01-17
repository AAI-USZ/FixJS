function(type, value, name) {
      Util.assert(type in StructDataTypes && 'addField is only used for primitives.');
      Util.typeValidation(type, value);
      name = name === undefined ? '' : name;
      var numBytes = type === 'utf8' ? value.length : StructDataTypes[type];
      Util.assert(numBytes > 0);

      //We convert these to a Long object, since we need to simulate them. :(
      if (type === 'long') {
        value = Primitives.getLongFromNumber(value);
      }

      this.data.push({'type': type, 'value': value, 'numBytes': numBytes, 'name': name});
    }