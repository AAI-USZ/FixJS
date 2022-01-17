function(type, value, name) {
      Util.assert(type in StructDataTypes && 'addField is only used for primitives.');
      name = name === undefined ? '' : name;
      var numBytes = type === 'utf8' ? value.length : StructDataTypes[type];
      this.data.push({'type': type, 'value': value, 'numBytes': numBytes, 'name': name});
    }