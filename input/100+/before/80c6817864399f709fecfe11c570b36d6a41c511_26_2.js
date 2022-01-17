function(sdmxdata) {
      var group, key, value, _ref;
      this.log.debug("" + this.constructor.name + " convertGroup");
      group = sdmxdata.data;
      if (group.components != null) {
        _ref = group.components;
        for (key in _ref) {
          value = _ref[key];
          if (this.dsd.dimensionDescriptor[key] != null) {
            if (group.groupKey == null) {
              group.groupKey = {};
            }
            group.groupKey[key] = value;
          } else if (this.dsd.attributeDescriptor[key] != null) {
            if (group.attributes == null) {
              group.attributes = {};
            }
            group.attributes[key] = value;
          }
        }
        delete group.components;
      }
      return sdmxdata;
    }