function(attrs) {
      var _ref, _ref1;
      if ((_ref = attrs['xml:lang']) == null) {
        attrs['xml:lang'] = 'en';
      }
      if ((_ref1 = dsdCur.name) == null) {
        dsdCur.name = {};
      }
      return dsdCur.name[attrs['xml:lang']] = this.stringBuffer;
    }