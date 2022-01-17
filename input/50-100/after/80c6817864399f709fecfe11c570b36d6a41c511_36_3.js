function(attrs) {
      var _ref, _ref1;
      if ((_ref = attrs['xml:lang']) == null) {
        attrs['xml:lang'] = 'en';
      }
      if ((_ref1 = partyCur.name) == null) {
        partyCur.name = {};
      }
      return partyCur.name[attrs['xml:lang']] = this.stringBuffer;
    }