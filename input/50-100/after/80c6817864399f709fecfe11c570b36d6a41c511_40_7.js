function(attrs) {
      var _ref, _ref1;
      if ((_ref = attrs['xml:lang']) == null) {
        attrs['xml:lang'] = 'en';
      }
      if ((_ref1 = codeListCur.description) == null) {
        codeListCur.description = {};
      }
      return codeListCur.description[attrs['xml:lang']] = this.stringBuffer;
    }