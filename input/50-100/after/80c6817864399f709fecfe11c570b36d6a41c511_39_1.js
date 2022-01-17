function(attrs) {
      var _ref, _ref1;
      if ((_ref = attrs['xml:lang']) == null) {
        attrs['xml:lang'] = 'en';
      }
      if ((_ref1 = headerCur.name) == null) {
        headerCur.name = {};
      }
      return headerCur.name[attrs['xml:lang']] = this.stringBuffer;
    }