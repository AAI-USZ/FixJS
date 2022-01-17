function(attrs) {
      var _ref, _ref1;
      if ((_ref = attrs['xml:lang']) == null) {
        attrs['xml:lang'] = 'en';
      }
      if ((_ref1 = codeCur.description) == null) {
        codeCur.description = {};
      }
      return codeCur.description[attrs['xml:lang']] = this.stringBuffer;
    }