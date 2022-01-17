function(attrs) {
      var _ref, _ref1;
      if ((_ref = attrs['xml:lang']) == null) {
        attrs['xml:lang'] = 'en';
      }
      if ((_ref1 = dataStructureCur.name) == null) {
        dataStructureCur.name = {};
      }
      return dataStructureCur.name[attrs['xml:lang']] = this.stringBuffer;
    }